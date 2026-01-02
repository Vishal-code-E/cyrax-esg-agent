import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { FileText, Download, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useEnvironmentalData, useSocialData, useGovernanceData, useSuppliers, useUserProfile, useCreateESGReport } from '@/integrations/supabase/hooks';
import { PDFReportGenerator } from '@/services/reports/pdfGenerator';
import type { ComplianceFramework, ESGDataInput } from '@/services/ai/agents';
import { toast } from 'sonner';
import { format } from 'date-fns';

const frameworks = [
  { value: 'gri', label: 'GRI Standards', description: 'Global Reporting Initiative' },
  { value: 'tcfd', label: 'TCFD', description: 'Task Force on Climate-related Financial Disclosures' },
  { value: 'sasb', label: 'SASB', description: 'Sustainability Accounting Standards Board' },
  { value: 'csrd', label: 'CSRD', description: 'Corporate Sustainability Reporting Directive' },
  { value: 'csddd', label: 'CSDDD', description: 'Corporate Sustainability Due Diligence Directive' },
  { value: 'uk_modern_slavery', label: 'UK Modern Slavery Act', description: 'UK Modern Slavery Act Reporting' },
];

interface GenerationStep {
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  message?: string;
}

const ReportGenerator = () => {
  const { data: profile } = useUserProfile();
  const { data: environmentalData } = useEnvironmentalData(profile?.id);
  const { data: socialData } = useSocialData(profile?.id);
  const { data: governanceData } = useGovernanceData(profile?.id);
  const { data: suppliers } = useSuppliers(profile?.id);
  const createReport = useCreateESGReport();

  const [selectedFramework, setSelectedFramework] = useState<ComplianceFramework>('gri');
  const [reportTitle, setReportTitle] = useState('ESG Compliance Report');
  const [periodStart, setPeriodStart] = useState('2024-01-01');
  const [periodEnd, setPeriodEnd] = useState('2024-12-31');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<GenerationStep[]>([]);

  const updateStep = (stepName: string, status: GenerationStep['status'], message?: string) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.name === stepName ? { ...step, status, message } : step
      )
    );
  };

  const initializeSteps = () => {
    setSteps([
      { name: 'Data Collection', status: 'pending' },
      { name: 'AI Data Analysis', status: 'pending' },
      { name: 'Regulatory Mapping', status: 'pending' },
      { name: 'Quality Validation', status: 'pending' },
      { name: 'Content Generation', status: 'pending' },
      { name: 'PDF Creation', status: 'pending' },
      { name: 'Database Storage', status: 'pending' },
    ]);
  };

  const handleGenerateReport = async () => {
    if (!profile || !environmentalData || !socialData || !governanceData) {
      toast.error('Missing required data. Please ensure all ESG data is available.');
      return;
    }

    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      toast.error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    initializeSteps();

    try {
      // Step 1: Data Collection
      updateStep('Data Collection', 'in-progress');
      setProgress(10);
      
      const esgData: ESGDataInput = {
        environmental: environmentalData,
        social: socialData,
        governance: governanceData,
        suppliers: suppliers || [],
      };

      updateStep('Data Collection', 'completed', `Collected ${environmentalData.length + socialData.length + governanceData.length} records`);
      setProgress(20);

      // Step 2-5: Generate report (AI agents handle these internally)
      updateStep('AI Data Analysis', 'in-progress');
      updateStep('Regulatory Mapping', 'in-progress');
      updateStep('Quality Validation', 'in-progress');
      updateStep('Content Generation', 'in-progress');
      setProgress(40);

      const generator = new PDFReportGenerator();
      const report = await generator.generateReport(esgData, {
        companyName: profile.company_name || 'Company',
        reportingPeriodStart: new Date(periodStart),
        reportingPeriodEnd: new Date(periodEnd),
        framework: selectedFramework,
        generatedDate: new Date(),
      });

      updateStep('AI Data Analysis', 'completed');
      updateStep('Regulatory Mapping', 'completed');
      updateStep('Quality Validation', 'completed');
      updateStep('Content Generation', 'completed');
      setProgress(80);

      // Step 6: PDF Creation
      updateStep('PDF Creation', 'in-progress');
      const pdfUrl = URL.createObjectURL(report.blob);
      updateStep('PDF Creation', 'completed', `${(report.blob.size / 1024).toFixed(0)} KB`);
      setProgress(90);

      // Step 7: Save to database
      updateStep('Database Storage', 'in-progress');
      await createReport.mutateAsync({
        company_id: profile.id,
        title: reportTitle,
        framework: selectedFramework,
        reporting_period_start: periodStart,
        reporting_period_end: periodEnd,
        status: 'completed',
        report_data: {
          fileName: report.fileName,
          fileSize: report.blob.size,
          generatedAt: new Date().toISOString(),
        },
        file_url: pdfUrl, // In production, upload to storage
        file_type: 'application/pdf',
        generated_at: new Date().toISOString(),
      });

      updateStep('Database Storage', 'completed');
      setProgress(100);

      // Download the file
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = report.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Report generated successfully!', {
        description: `Your ${selectedFramework.toUpperCase()} report is ready.`,
      });
    } catch (error) {
      console.error('Report generation error:', error);
      const currentStep = steps.find((s) => s.status === 'in-progress');
      if (currentStep) {
        updateStep(currentStep.name, 'error', error instanceof Error ? error.message : 'Unknown error');
      }
      toast.error('Report generation failed', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const hasData = environmentalData && socialData && governanceData;
  const dataCount = (environmentalData?.length || 0) + (socialData?.length || 0) + (governanceData?.length || 0);

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">AI-Powered Report Generation</CardTitle>
            <CardDescription>
              Multi-agent system generates framework-compliant PDF reports from your ESG data
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!hasData && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No ESG data available. Please add environmental, social, and governance data to generate reports.
            </AlertDescription>
          </Alert>
        )}

        {hasData && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-900">
              {dataCount} ESG records ready for report generation
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="framework">Compliance Framework</Label>
            <Select
              value={selectedFramework}
              onValueChange={(value) => setSelectedFramework(value as ComplianceFramework)}
              disabled={isGenerating}
            >
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select framework" />
              </SelectTrigger>
              <SelectContent>
                {frameworks.map((framework) => (
                  <SelectItem key={framework.value} value={framework.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{framework.label}</span>
                      <span className="text-xs text-muted-foreground">{framework.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Report Title</Label>
            <Input
              id="title"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              disabled={isGenerating}
              placeholder="ESG Compliance Report"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="periodStart">Reporting Period Start</Label>
            <Input
              id="periodStart"
              type="date"
              value={periodStart}
              onChange={(e) => setPeriodStart(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="periodEnd">Reporting Period End</Label>
            <Input
              id="periodEnd"
              type="date"
              value={periodEnd}
              onChange={(e) => setPeriodEnd(e.target.value)}
              disabled={isGenerating}
            />
          </div>
        </div>

        {isGenerating && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Generation Progress</span>
                <span className="text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-2 bg-gray-50 p-4 rounded-lg border">
              <h4 className="text-sm font-medium mb-3">Agent Workflow</h4>
              {steps.map((step, index) => (
                <div key={step.name} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {step.status === 'pending' && (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                    {step.status === 'in-progress' && (
                      <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                    )}
                    {step.status === 'completed' && (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    )}
                    {step.status === 'error' && (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        step.status === 'completed' ? 'text-green-900' :
                        step.status === 'error' ? 'text-red-900' :
                        step.status === 'in-progress' ? 'text-purple-900' :
                        'text-gray-600'
                      }`}>
                        {step.name}
                      </span>
                      {step.message && (
                        <span className="text-xs text-muted-foreground ml-2">
                          {step.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 pt-4 border-t">
          <Button
            onClick={handleGenerateReport}
            disabled={isGenerating || !hasData}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate AI Report
              </>
            )}
          </Button>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Multi-Agent AI System
          </h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• <strong>Data Analysis Agent:</strong> Analyzes ESG data and identifies key insights</li>
            <li>• <strong>Regulatory Mapping Agent:</strong> Maps data to framework requirements</li>
            <li>• <strong>Quality Validation Agent:</strong> Validates data completeness and accuracy</li>
            <li>• <strong>Report Generation Agent:</strong> Creates audit-ready narrative content</li>
            <li>• <strong>PDF Creation:</strong> Formats report with tables, charts, and professional layout</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;
