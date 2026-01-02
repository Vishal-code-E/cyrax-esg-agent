/**
 * PDF Report Generator
 * Creates framework-compliant PDF reports from AI-generated content
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import type { ComplianceFramework, ESGDataInput } from '../ai/agents';
import { AgentOrchestrator } from '../ai/agents';
import type { Tables } from '@/integrations/supabase/types';

// Extend jsPDF type to include autoTable property
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY: number };
}

interface ReportMetadata {
  companyName: string;
  reportingPeriodStart: Date;
  reportingPeriodEnd: Date;
  framework: ComplianceFramework;
  generatedDate: Date;
}

interface GeneratedReport {
  pdf: jsPDF;
  blob: Blob;
  fileName: string;
}

export class PDFReportGenerator {
  private orchestrator = new AgentOrchestrator();

  /**
   * Generate a complete ESG compliance report
   */
  async generateReport(
    data: ESGDataInput,
    metadata: ReportMetadata
  ): Promise<GeneratedReport> {
    // Step 1: Orchestrate AI agents to generate content
    const aiContent = await this.orchestrator.orchestrateReportGeneration(
      data,
      metadata.framework
    );

    // Step 2: Create PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    let yPosition = margin;

    // Helper function to add new page if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Helper function to add footer
    const addFooter = (pageNum: number) => {
      const footerY = pageHeight - 10;
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        `${metadata.companyName} | ${this.getFrameworkFullName(metadata.framework)} Report | Page ${pageNum}`,
        pageWidth / 2,
        footerY,
        { align: 'center' }
      );
    };

    // Cover Page
    this.addCoverPage(pdf, metadata, pageWidth, pageHeight);
    
    // Table of Contents
    pdf.addPage();
    yPosition = margin;
    this.addTableOfContents(pdf, margin, yPosition);

    // Executive Summary
    pdf.addPage();
    yPosition = margin;
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Executive Summary', margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const summaryLines = pdf.splitTextToSize(
      aiContent.executiveSummary.output,
      contentWidth
    );
    pdf.text(summaryLines, margin, yPosition);
    yPosition += summaryLines.length * 5 + 10;
    addFooter(pdf.getNumberOfPages());

    // Data Quality Assessment
    pdf.addPage();
    yPosition = margin;
    this.addDataQualitySection(pdf, aiContent.dataQuality.output, margin, yPosition);
    addFooter(pdf.getNumberOfPages());

    // Environmental Section
    pdf.addPage();
    yPosition = margin;
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(34, 139, 34); // Green
    pdf.text('Environmental Performance', margin, yPosition);
    yPosition += 12;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    const envLines = pdf.splitTextToSize(
      aiContent.environmentalSection.output,
      contentWidth
    );
    
    for (let i = 0; i < envLines.length; i++) {
      checkPageBreak(10);
      pdf.text(envLines[i], margin, yPosition);
      yPosition += 5;
    }

    this.addEnvironmentalMetricsTable(pdf, data.environmental, margin);
    addFooter(pdf.getNumberOfPages());

    // Social Section
    pdf.addPage();
    yPosition = margin;
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 144, 255); // Blue
    pdf.text('Social Performance', margin, yPosition);
    yPosition += 12;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    const socialLines = pdf.splitTextToSize(
      aiContent.socialSection.output,
      contentWidth
    );
    
    for (let i = 0; i < socialLines.length; i++) {
      checkPageBreak(10);
      pdf.text(socialLines[i], margin, yPosition);
      yPosition += 5;
    }

    this.addSocialMetricsTable(pdf, data.social, margin);
    addFooter(pdf.getNumberOfPages());

    // Governance Section
    pdf.addPage();
    yPosition = margin;
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(138, 43, 226); // Purple
    pdf.text('Governance Performance', margin, yPosition);
    yPosition += 12;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    const govLines = pdf.splitTextToSize(
      aiContent.governanceSection.output,
      contentWidth
    );
    
    for (let i = 0; i < govLines.length; i++) {
      checkPageBreak(10);
      pdf.text(govLines[i], margin, yPosition);
      yPosition += 5;
    }

    this.addGovernanceMetricsTable(pdf, data.governance, margin);
    addFooter(pdf.getNumberOfPages());

    // Regulatory Compliance Summary
    pdf.addPage();
    yPosition = margin;
    this.addRegulatoryComplianceSection(
      pdf,
      aiContent.regulatoryMapping.output,
      metadata.framework,
      margin,
      yPosition
    );
    addFooter(pdf.getNumberOfPages());

    // Generate blob and filename
    const blob = pdf.output('blob');
    const fileName = `${metadata.companyName.replace(/\s+/g, '_')}_${metadata.framework.toUpperCase()}_Report_${format(metadata.generatedDate, 'yyyy-MM-dd')}.pdf`;

    return { pdf, blob, fileName };
  }

  private addCoverPage(
    pdf: jsPDF,
    metadata: ReportMetadata,
    pageWidth: number,
    pageHeight: number
  ) {
    // Background color
    pdf.setFillColor(248, 250, 252);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Company name
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text(metadata.companyName, pageWidth / 2, 80, { align: 'center' });

    // Report title
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(51, 65, 85);
    pdf.text(
      `${this.getFrameworkFullName(metadata.framework)} Report`,
      pageWidth / 2,
      100,
      { align: 'center' }
    );

    // Reporting period
    pdf.setFontSize(14);
    pdf.setTextColor(100, 116, 139);
    pdf.text(
      `Reporting Period: ${format(metadata.reportingPeriodStart, 'MMM yyyy')} - ${format(metadata.reportingPeriodEnd, 'MMM yyyy')}`,
      pageWidth / 2,
      120,
      { align: 'center' }
    );

    // Generated date
    pdf.setFontSize(12);
    pdf.text(
      `Generated: ${format(metadata.generatedDate, 'MMMM dd, yyyy')}`,
      pageWidth / 2,
      135,
      { align: 'center' }
    );

    // AI Badge
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(139, 92, 246);
    pdf.text(
      '🤖 AI-Generated Report | Multi-Agent ESG Intelligence',
      pageWidth / 2,
      pageHeight - 40,
      { align: 'center' }
    );

    // Framework badge
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    const badgeWidth = 60;
    const badgeHeight = 12;
    const badgeX = (pageWidth - badgeWidth) / 2;
    const badgeY = 150;
    
    pdf.setFillColor(139, 92, 246);
    pdf.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 3, 3, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.text(
      metadata.framework.toUpperCase(),
      pageWidth / 2,
      badgeY + 8,
      { align: 'center' }
    );
  }

  private addTableOfContents(pdf: jsPDF, x: number, y: number) {
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Table of Contents', x, y);
    y += 15;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');

    const contents = [
      { title: 'Executive Summary', page: 3 },
      { title: 'Data Quality Assessment', page: 4 },
      { title: 'Environmental Performance', page: 5 },
      { title: 'Social Performance', page: 6 },
      { title: 'Governance Performance', page: 7 },
      { title: 'Regulatory Compliance Summary', page: 8 },
    ];

    contents.forEach((item) => {
      pdf.text(item.title, x + 5, y);
      pdf.text(`${item.page}`, pdf.internal.pageSize.getWidth() - x - 5, y, {
        align: 'right',
      });
      y += 8;
    });
  }

  private addDataQualitySection(pdf: jsPDF, dataQualityOutput: string, x: number, y: number) {
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Data Quality Assessment', x, y);
    y += 12;

    try {
      const quality = JSON.parse(dataQualityOutput);
      
      // Quality scores table
      autoTable(pdf, {
        startY: y,
        head: [['Metric', 'Score', 'Status']],
        body: [
          ['Completeness', `${quality.completeness}%`, this.getStatusIcon(quality.completeness)],
          ['Consistency', `${quality.consistency}%`, this.getStatusIcon(quality.consistency)],
          ['Accuracy', `${quality.accuracy}%`, this.getStatusIcon(quality.accuracy)],
          ['Audit Readiness', `${quality.auditReadiness}%`, this.getStatusIcon(quality.auditReadiness)],
        ],
        theme: 'grid',
        headStyles: { fillColor: [99, 102, 241] },
      });

      if (quality.issues && quality.issues.length > 0) {
        const currentY = (pdf as jsPDFWithAutoTable).lastAutoTable?.finalY ?? 100;
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Data Quality Issues', x, currentY);
        
        const issuesData = quality.issues.map((issue: { severity: string; field: string; issue: string; recommendation: string }) => [
          issue.severity.toUpperCase(),
          issue.field,
          issue.issue,
          issue.recommendation,
        ]);

        autoTable(pdf, {
          startY: currentY + 8,
          head: [['Severity', 'Field', 'Issue', 'Recommendation']],
          body: issuesData,
          theme: 'grid',
          headStyles: { fillColor: [239, 68, 68] },
        });
      }
    } catch (e) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(dataQualityOutput, x, y);
    }
  }

  private addEnvironmentalMetricsTable(pdf: jsPDF, data: Tables<'environmental_data'>[], x: number) {
    if (!data || data.length === 0) return;

    const latest = data[0];
    const tableData = [
      ['Scope 1 Emissions', `${latest.scope_1_emissions || 'N/A'} tCO2e`],
      ['Scope 2 Emissions', `${latest.scope_2_emissions || 'N/A'} tCO2e`],
      ['Scope 3 Emissions', `${latest.scope_3_emissions || 'N/A'} tCO2e`],
      ['Total Emissions', `${latest.total_emissions || 'N/A'} tCO2e`],
      ['Renewable Energy %', `${latest.renewable_energy_percentage || 'N/A'}%`],
      ['EV Vehicles', `${latest.ev_vehicles || 'N/A'} / ${latest.total_vehicles || 'N/A'}`],
      ['Recycling Rate', `${latest.recycling_rate_percentage || 'N/A'}%`],
    ];

    autoTable(pdf, {
      startY: (pdf as jsPDFWithAutoTable).lastAutoTable?.finalY ? (pdf as jsPDFWithAutoTable).lastAutoTable!.finalY + 10 : pdf.internal.pageSize.getHeight() / 2,
      head: [['Metric', 'Value']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [34, 139, 34] },
    });
  }

  private addSocialMetricsTable(pdf: jsPDF, data: Tables<'social_data'>[], x: number) {
    if (!data || data.length === 0) return;

    const latest = data[0];
    const tableData = [
      ['Total Employees', `${latest.total_employees || 'N/A'}`],
      ['Total Incidents', `${latest.total_incidents || 'N/A'}`],
      ['Incident Rate', `${latest.incident_rate || 'N/A'}`],
      ['Training Hours/Employee', `${latest.training_hours_per_employee || 'N/A'}`],
      ['Female Employees %', `${latest.female_employees_percentage || 'N/A'}%`],
      ['Supplier Audits Completed', `${latest.supplier_audits_completed || 'N/A'}`],
      ['Grievances Resolved', `${latest.grievances_resolved || 'N/A'} / ${latest.grievances_reported || 'N/A'}`],
    ];

    autoTable(pdf, {
      startY: (pdf as jsPDFWithAutoTable).lastAutoTable?.finalY ? (pdf as jsPDFWithAutoTable).lastAutoTable!.finalY + 10 : pdf.internal.pageSize.getHeight() / 2,
      head: [['Metric', 'Value']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [30, 144, 255] },
    });
  }

  private addGovernanceMetricsTable(pdf: jsPDF, data: Tables<'governance_data'>[], x: number) {
    if (!data || data.length === 0) return;

    const latest = data[0];
    const tableData = [
      ['Board ESG Oversight', latest.board_esg_oversight ? 'Yes' : 'No'],
      ['ESG Committee', latest.esg_committee_exists ? 'Yes' : 'No'],
      ['Independent Directors %', `${latest.independent_directors_percentage || 'N/A'}%`],
      ['Code of Conduct Violations', `${latest.code_of_conduct_violations || 'N/A'}`],
      ['Corruption Incidents', `${latest.corruption_incidents || 'N/A'}`],
      ['Internal Audits', `${latest.internal_audits_completed || 'N/A'}`],
      ['External Audits', `${latest.external_audits_completed || 'N/A'}`],
      ['Cybersecurity Incidents', `${latest.cybersecurity_incidents || 'N/A'}`],
    ];

    autoTable(pdf, {
      startY: (pdf as jsPDFWithAutoTable).lastAutoTable?.finalY ? (pdf as jsPDFWithAutoTable).lastAutoTable!.finalY + 10 : pdf.internal.pageSize.getHeight() / 2,
      head: [['Metric', 'Value']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [138, 43, 226] },
    });
  }

  private addRegulatoryComplianceSection(
    pdf: jsPDF,
    mappingOutput: string,
    framework: ComplianceFramework,
    x: number,
    y: number
  ) {
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${this.getFrameworkFullName(framework)} Compliance`, x, y);
    y += 12;

    try {
      const mapping = JSON.parse(mappingOutput);
      
      // Overall compliance
      pdf.setFontSize(14);
      pdf.text(`Overall Compliance: ${mapping.overallCompliance}%`, x, y);
      y += 10;

      if (mapping.requirements) {
        const reqData = mapping.requirements.map((req: { requirement: string; compliance: number; gaps?: string[]; recommendations?: string[] }) => [
          req.requirement,
          `${req.compliance}%`,
          req.gaps?.length || 0,
          req.recommendations?.[0] || 'N/A',
        ]);

        autoTable(pdf, {
          startY: y,
          head: [['Requirement', 'Compliance', 'Gaps', 'Recommendation']],
          body: reqData,
          theme: 'grid',
          headStyles: { fillColor: [99, 102, 241] },
          columnStyles: {
            0: { cellWidth: 50 },
            1: { cellWidth: 25 },
            2: { cellWidth: 20 },
            3: { cellWidth: 75 },
          },
        });
      }

      if (mapping.summary) {
        const summaryYPos = ((pdf as jsPDFWithAutoTable).lastAutoTable?.finalY ?? 100) + 10;
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Summary', x, summaryYPos);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const summaryLines = pdf.splitTextToSize(mapping.summary, pdf.internal.pageSize.getWidth() - 2 * x);
        pdf.text(summaryLines, x, summaryYPos + 7);
      }
    } catch (e) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(mappingOutput, x, y);
    }
  }

  private getStatusIcon(score: number): string {
    if (score >= 90) return '✓ Excellent';
    if (score >= 75) return '○ Good';
    if (score >= 60) return '◐ Fair';
    return '✗ Needs Improvement';
  }

  private getFrameworkFullName(framework: ComplianceFramework): string {
    const names: Record<ComplianceFramework, string> = {
      gri: 'GRI Standards',
      tcfd: 'TCFD',
      sasb: 'SASB Transportation',
      csrd: 'CSRD',
      csddd: 'CSDDD',
      uk_modern_slavery: 'UK Modern Slavery Act',
    };
    return names[framework];
  }
}
