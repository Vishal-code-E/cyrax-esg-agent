/**
 * Multi-Agent AI System for ESG Report Generation
 * Implements specialized agents for data analysis, regulatory mapping, and report generation
 */

import OpenAI from 'openai';
import type { Tables } from '@/integrations/supabase/types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true, // For demo purposes only - should use backend in production
});

export type ComplianceFramework = 'gri' | 'tcfd' | 'sasb' | 'csrd' | 'csddd' | 'uk_modern_slavery';

export interface ESGDataInput {
  environmental: Tables<'environmental_data'>[];
  social: Tables<'social_data'>[];
  governance: Tables<'governance_data'>[];
  suppliers?: Tables<'suppliers'>[];
}

export interface AgentResponse {
  agent: string;
  output: string;
  metadata?: Record<string, any>;
}

/**
 * Data Analysis Agent
 * Analyzes ESG data and extracts key insights
 */
export class DataAnalysisAgent {
  async analyze(data: ESGDataInput): Promise<AgentResponse> {
    const prompt = `You are the Data Analysis Agent for an ESG reporting system.

Analyze the following ESG data and provide key insights:

ENVIRONMENTAL DATA:
${JSON.stringify(data.environmental, null, 2)}

SOCIAL DATA:
${JSON.stringify(data.social, null, 2)}

GOVERNANCE DATA:
${JSON.stringify(data.governance, null, 2)}

${data.suppliers ? `SUPPLIER DATA:\n${JSON.stringify(data.suppliers, null, 2)}` : ''}

Provide:
1. Key performance indicators and trends
2. Areas of strength
3. Areas requiring attention
4. Data quality assessment
5. Notable patterns or anomalies

Format your response as structured JSON with these sections.`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      });

      return {
        agent: 'DataAnalysisAgent',
        output: response.choices[0].message.content || '',
        metadata: {
          model: response.model,
          usage: response.usage,
        },
      };
    } catch (error) {
      console.error('Data Analysis Agent error:', error);
      throw new Error('Failed to analyze ESG data');
    }
  }
}

/**
 * Regulatory Mapping Agent
 * Maps ESG data to specific compliance framework requirements
 */
export class RegulatoryMappingAgent {
  private frameworkRequirements: Record<ComplianceFramework, string> = {
    gri: `GRI Standards (Global Reporting Initiative):
- GRI 302: Energy (fuel, electricity, renewable percentage)
- GRI 305: Emissions (Scope 1, 2, 3)
- GRI 403: Occupational Health and Safety (incidents, training)
- GRI 404: Training and Education
- GRI 205: Anti-corruption
- GRI 308: Supplier Environmental Assessment
- GRI 414: Supplier Social Assessment`,
    
    tcfd: `TCFD (Task Force on Climate-related Financial Disclosures):
- Governance: Board oversight of climate risks
- Strategy: Climate-related risks and opportunities
- Risk Management: Climate risk identification and management
- Metrics and Targets: Scope 1, 2, 3 emissions, climate-related targets`,
    
    sasb: `SASB Transportation Sector Standards:
- Fleet fuel management and efficiency
- Air quality emissions
- Employee health, safety, and training
- Labor practices and human rights in supply chain
- Business ethics and compliance`,
    
    csrd: `CSRD (Corporate Sustainability Reporting Directive):
- Double materiality assessment
- Environmental sustainability (climate, pollution, water, biodiversity)
- Social sustainability (workforce, value chain, communities)
- Governance sustainability (business conduct, corporate governance)`,
    
    csddd: `CSDDD (Corporate Sustainability Due Diligence Directive):
- Human rights due diligence in supply chain
- Environmental due diligence
- Risk identification and mitigation
- Supplier engagement and monitoring
- Grievance mechanisms`,
    
    uk_modern_slavery: `UK Modern Slavery Act:
- Organization structure and supply chains
- Policies on slavery and human trafficking
- Due diligence processes
- Risk assessment and management
- Training and awareness
- Effectiveness measurement`,
  };

  async mapToFramework(data: ESGDataInput, framework: ComplianceFramework): Promise<AgentResponse> {
    const requirements = this.frameworkRequirements[framework];
    
    const prompt = `You are the Regulatory Mapping Agent for ESG compliance.

Your task is to map the provided ESG data to ${framework.toUpperCase()} framework requirements.

FRAMEWORK REQUIREMENTS:
${requirements}

ESG DATA:
${JSON.stringify(data, null, 2)}

For each requirement:
1. Identify which data points satisfy it
2. Calculate compliance percentage (0-100%)
3. Identify gaps or missing data
4. Provide specific recommendations

Return a structured JSON response with:
{
  "framework": "${framework}",
  "overallCompliance": <percentage>,
  "requirements": [
    {
      "requirement": "<name>",
      "compliance": <percentage>,
      "dataMapped": ["<data points>"],
      "gaps": ["<missing items>"],
      "recommendations": ["<suggestions>"]
    }
  ],
  "summary": "<overall assessment>"
}`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.2,
      });

      return {
        agent: 'RegulatoryMappingAgent',
        output: response.choices[0].message.content || '',
        metadata: {
          framework,
          model: response.model,
          usage: response.usage,
        },
      };
    } catch (error) {
      console.error('Regulatory Mapping Agent error:', error);
      throw new Error(`Failed to map data to ${framework} framework`);
    }
  }
}

/**
 * Report Generation Agent
 * Generates framework-compliant narrative content for reports
 */
export class ReportGenerationAgent {
  async generateExecutiveSummary(
    data: ESGDataInput,
    framework: ComplianceFramework,
    analysisOutput: string,
    mappingOutput: string
  ): Promise<AgentResponse> {
    const prompt = `You are the Report Generation Agent for ESG compliance reporting.

Generate a professional executive summary for a ${framework.toUpperCase()} compliance report.

DATA ANALYSIS:
${analysisOutput}

REGULATORY MAPPING:
${mappingOutput}

The executive summary should:
1. Be 300-500 words
2. Use professional, audit-ready language
3. Highlight key achievements and metrics
4. Address compliance status
5. Outline areas for improvement
6. Follow ${framework.toUpperCase()} reporting conventions

Write in third person, present tense. Be specific with numbers and percentages.`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
      });

      return {
        agent: 'ReportGenerationAgent',
        output: response.choices[0].message.content || '',
        metadata: {
          framework,
          type: 'executive_summary',
          model: response.model,
          usage: response.usage,
        },
      };
    } catch (error) {
      console.error('Report Generation Agent error:', error);
      throw new Error('Failed to generate executive summary');
    }
  }

  async generateDetailedSections(
    pillar: 'environmental' | 'social' | 'governance',
    data: any[],
    framework: ComplianceFramework,
    mappingOutput: string
  ): Promise<AgentResponse> {
    const prompt = `You are the Report Generation Agent for ESG compliance reporting.

Generate detailed ${pillar.toUpperCase()} section content for a ${framework.toUpperCase()} report.

${pillar.toUpperCase()} DATA:
${JSON.stringify(data, null, 2)}

REGULATORY MAPPING:
${mappingOutput}

Generate:
1. Section introduction (2-3 paragraphs)
2. Key metrics and performance indicators
3. Methodology and data collection notes
4. Year-over-year trends (if applicable)
5. Challenges and mitigation strategies
6. Future targets and commitments

Use professional language suitable for auditors and regulators. Include specific numbers and percentages.`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
      });

      return {
        agent: 'ReportGenerationAgent',
        output: response.choices[0].message.content || '',
        metadata: {
          framework,
          pillar,
          type: 'detailed_section',
          model: response.model,
          usage: response.usage,
        },
      };
    } catch (error) {
      console.error('Report Generation Agent error:', error);
      throw new Error(`Failed to generate ${pillar} section`);
    }
  }
}

/**
 * Audit & Integrity Agent
 * Validates data quality and maintains audit trail
 */
export class AuditIntegrityAgent {
  async validateDataQuality(data: ESGDataInput): Promise<AgentResponse> {
    const prompt = `You are the Audit & Integrity Agent for ESG data validation.

Assess the data quality and integrity of the following ESG data:

${JSON.stringify(data, null, 2)}

Evaluate:
1. Data completeness (% of required fields populated)
2. Data consistency (logical relationships, no contradictions)
3. Data accuracy indicators (verification status, sources)
4. Outliers or anomalies requiring review
5. Audit readiness score (0-100)

Return structured JSON:
{
  "completeness": <percentage>,
  "consistency": <percentage>,
  "accuracy": <percentage>,
  "auditReadiness": <percentage>,
  "issues": [
    {
      "severity": "high|medium|low",
      "field": "<field name>",
      "issue": "<description>",
      "recommendation": "<action>"
    }
  ],
  "summary": "<overall assessment>"
}`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.1,
      });

      return {
        agent: 'AuditIntegrityAgent',
        output: response.choices[0].message.content || '',
        metadata: {
          model: response.model,
          usage: response.usage,
        },
      };
    } catch (error) {
      console.error('Audit Integrity Agent error:', error);
      throw new Error('Failed to validate data quality');
    }
  }
}

/**
 * Agent Orchestrator
 * Coordinates all agents in the proper sequence
 */
export class AgentOrchestrator {
  private dataAnalysisAgent = new DataAnalysisAgent();
  private regulatoryMappingAgent = new RegulatoryMappingAgent();
  private reportGenerationAgent = new ReportGenerationAgent();
  private auditIntegrityAgent = new AuditIntegrityAgent();

  async orchestrateReportGeneration(
    data: ESGDataInput,
    framework: ComplianceFramework
  ): Promise<{
    dataAnalysis: AgentResponse;
    regulatoryMapping: AgentResponse;
    dataQuality: AgentResponse;
    executiveSummary: AgentResponse;
    environmentalSection: AgentResponse;
    socialSection: AgentResponse;
    governanceSection: AgentResponse;
  }> {
    console.log(`Starting multi-agent orchestration for ${framework} report...`);

    // Step 1: Data Quality Validation
    console.log('Step 1: Validating data quality...');
    const dataQuality = await this.auditIntegrityAgent.validateDataQuality(data);

    // Step 2: Data Analysis
    console.log('Step 2: Analyzing ESG data...');
    const dataAnalysis = await this.dataAnalysisAgent.analyze(data);

    // Step 3: Regulatory Mapping
    console.log('Step 3: Mapping to regulatory framework...');
    const regulatoryMapping = await this.regulatoryMappingAgent.mapToFramework(data, framework);

    // Step 4: Generate Executive Summary
    console.log('Step 4: Generating executive summary...');
    const executiveSummary = await this.reportGenerationAgent.generateExecutiveSummary(
      data,
      framework,
      dataAnalysis.output,
      regulatoryMapping.output
    );

    // Step 5: Generate Detailed Sections
    console.log('Step 5: Generating detailed sections...');
    const [environmentalSection, socialSection, governanceSection] = await Promise.all([
      this.reportGenerationAgent.generateDetailedSections(
        'environmental',
        data.environmental,
        framework,
        regulatoryMapping.output
      ),
      this.reportGenerationAgent.generateDetailedSections(
        'social',
        data.social,
        framework,
        regulatoryMapping.output
      ),
      this.reportGenerationAgent.generateDetailedSections(
        'governance',
        data.governance,
        framework,
        regulatoryMapping.output
      ),
    ]);

    console.log('Multi-agent orchestration complete!');

    return {
      dataAnalysis,
      regulatoryMapping,
      dataQuality,
      executiveSummary,
      environmentalSection,
      socialSection,
      governanceSection,
    };
  }
}
