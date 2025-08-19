import { PromptRequest } from './ai';

/**
 * Prompt optimization strategies
 */
export enum OptimizationStrategy {
  BASIC = 'basic',
  DETAILED = 'detailed',
  CONCISE = 'concise',
  TECHNICAL = 'technical',
  CREATIVE = 'creative',
}

/**
 * Interface for optimized prompt result
 */
export interface OptimizedPrompt {
  originalPrompt: string;
  optimizedPrompt: string;
  strategy: OptimizationStrategy;
  metadata: {
    optimizationTechnique: string;
    promptLength: number;
    optimizedLength: number;
    keywordsExtracted?: string[];
    improvementSuggestions?: string[];
  };
}

/**
 * Prompt Optimizer class that enhances raw user prompts
 */
export class PromptOptimizer {
  /**
   * Optimize a prompt using the specified strategy
   */
  static optimize(
    prompt: string,
    strategy: OptimizationStrategy = OptimizationStrategy.BASIC,
    request?: Partial<PromptRequest>
  ): OptimizedPrompt {
    let optimizedPrompt = prompt;
    let technique = 'basic enhancement';
    let suggestions: string[] = [];
    
    switch (strategy) {
      case OptimizationStrategy.DETAILED:
        optimizedPrompt = this.addDetailedContext(prompt, request);
        technique = 'context enrichment';
        suggestions = ['Consider adding more specific examples', 'Specify desired output format'];
        break;
        
      case OptimizationStrategy.CONCISE:
        optimizedPrompt = this.makeConcise(prompt);
        technique = 'brevity optimization';
        suggestions = ['Focus on key requirements', 'Remove redundant information'];
        break;
        
      case OptimizationStrategy.TECHNICAL:
        optimizedPrompt = this.enhanceTechnical(prompt);
        technique = 'technical enhancement';
        suggestions = ['Add technical specifications', 'Include format requirements'];
        break;
        
      case OptimizationStrategy.CREATIVE:
        optimizedPrompt = this.enhanceCreative(prompt);
        technique = 'creativity enhancement';
        suggestions = ['Explore unconventional approaches', 'Consider metaphorical thinking'];
        break;
        
      default: // BASIC
        optimizedPrompt = this.enhanceBasic(prompt);
        technique = 'basic enhancement';
        suggestions = ['Be more specific', 'Add context about your goals'];
        break;
    }
    
    const keywords = this.extractKeywords(prompt);
    
    return {
      originalPrompt: prompt,
      optimizedPrompt,
      strategy,
      metadata: {
        optimizationTechnique: technique,
        promptLength: prompt.length,
        optimizedLength: optimizedPrompt.length,
        keywordsExtracted: keywords,
        improvementSuggestions: suggestions,
      },
    };
  }
  
  /**
   * Basic prompt enhancement
   */
  private static enhanceBasic(prompt: string): string {
    // Add clarity and specificity
    let enhanced = prompt.trim();
    
    // Ensure it ends with a question mark if it's a question
    if (enhanced.match(/^(what|how|why|when|where|who|can|could|would|will|is|are|do|does|did)/i) && !enhanced.endsWith('?')) {
      enhanced += '?';
    }
    
    // Add a request for comprehensive response if prompt is very short
    if (enhanced.length < 20) {
      enhanced += ' Please provide a comprehensive response.';
    }
    
    return enhanced;
  }
  
  /**
   * Add detailed context to the prompt
   */
  private static addDetailedContext(prompt: string, request?: Partial<PromptRequest>): string {
    let enhanced = prompt.trim();
    
    // Add context based on role if available
    if (request?.role) {
      enhanced = `As a ${request.role}, I need: ${enhanced}`;
    }
    
    // Add output expectations
    enhanced += '\n\nPlease provide a detailed response with examples where appropriate.';
    
    return enhanced;
  }
  
  /**
   * Make the prompt more concise
   */
  private static makeConcise(prompt: string): string {
    // Remove filler words and phrases
    let concise = prompt
      .replace(/\b(just|basically|actually|literally|very|really|simply|that is|i mean)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Add clarity about brevity
    concise += ' Please be concise and direct in your response.';
    
    return concise;
  }
  
  /**
   * Enhance technical aspects of the prompt
   */
  private static enhanceTechnical(prompt: string): string {
    let technical = prompt.trim();
    
    // Add technical framing
    technical = `Technical request: ${technical}\n\nPlease include relevant technical details, specifications, and code examples if applicable.`;
    
    return technical;
  }
  
  /**
   * Enhance creative aspects of the prompt
   */
  private static enhanceCreative(prompt: string): string {
    let creative = prompt.trim();
    
    // Add creative framing
    creative = `Creative challenge: ${creative}\n\nPlease explore innovative and unconventional approaches in your response.`;
    
    return creative;
  }
  
  /**
   * Extract keywords from the prompt
   */
  private static extractKeywords(prompt: string): string[] {
    // Simple keyword extraction based on word frequency and importance
    const words = prompt.toLowerCase().match(/\b\w{3,}\b/g) || [];
    const stopWords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'are', 'from', 'have', 'you', 'can', 'will']);
    
    // Count word frequency
    const wordCount: Record<string, number> = {};
    for (const word of words) {
      if (!stopWords.has(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    }
    
    // Get top keywords
    return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  }
}