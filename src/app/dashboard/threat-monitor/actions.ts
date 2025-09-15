"use server";

import {
  aiPoweredThreatMonitoring,
  AIPoweredThreatMonitoringInput,
  AIPoweredThreatMonitoringOutput,
} from "@/ai/flows/ai-powered-threat-monitoring";

export async function analyzeThreats(
  input: AIPoweredThreatMonitoringInput
): Promise<AIPoweredThreatMonitoringOutput> {
  console.log("Analyzing threats for:", input.organizationName);
  try {
    const result = await aiPoweredThreatMonitoring(input);
    return result;
  } catch (error) {
    console.error("Error analyzing threats:", error);
    return {
      threatDetected: true,
      alertMessage: "An error occurred during the analysis. Please check the server logs.",
    };
  }
}
