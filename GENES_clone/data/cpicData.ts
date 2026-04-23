/**
 * cpicData.ts
 * Embedded CPIC guideline data for the frontend engine.
 * Drug → Gene mappings, phenotype tables, recommendations, and LLM explanations.
 */

import { Phenotype, RiskLabel, Severity, CPICRecommendation } from '../types';

// ── Supported drugs (shown in the drug picker dropdown) ──────────────────────

export const SUPPORTED_DRUGS: string[] = [
    'CODEINE',
    'WARFARIN',
    'CLOPIDOGREL',
    'SIMVASTATIN',
    'AZATHIOPRINE',
    'FLUOROURACIL',
];

// ── Drug → Primary Gene mapping ───────────────────────────────────────────────

export const DRUG_GENE_MAP: Record<string, string[]> = {
    CODEINE: ['CYP2D6'],
    WARFARIN: ['CYP2C9'],
    CLOPIDOGREL: ['CYP2C19'],
    SIMVASTATIN: ['SLCO1B1'],
    AZATHIOPRINE: ['TPMT'],
    FLUOROURACIL: ['DPYD'],
};

// ── Phenotype map: Gene → Diplotype → Phenotype ───────────────────────────────

export const PHENOTYPE_MAP: Record<string, Record<string, Phenotype>> = {
    CYP2D6: {
        '*1/*1': Phenotype.NM,
        '*1/*2': Phenotype.NM,
        '*2/*2': Phenotype.NM,
        '*1/*4': Phenotype.IM,
        '*1/*10': Phenotype.IM,
        '*1/*17': Phenotype.IM,
        '*1/*41': Phenotype.IM,
        '*4/*4': Phenotype.PM,
        '*10/*10': Phenotype.PM,
        '*17/*17': Phenotype.PM,
        '*41/*41': Phenotype.PM,
        '*1/*1xN': Phenotype.UM,
    },
    CYP2C9: {
        '*1/*1': Phenotype.NM,
        '*1/*2': Phenotype.IM,
        '*1/*3': Phenotype.IM,
        '*2/*2': Phenotype.PM,
        '*2/*3': Phenotype.PM,
        '*3/*3': Phenotype.PM,
    },
    CYP2C19: {
        '*1/*1': Phenotype.NM,
        '*1/*2': Phenotype.IM,
        '*1/*3': Phenotype.IM,
        '*2/*2': Phenotype.PM,
        '*2/*3': Phenotype.PM,
        '*3/*3': Phenotype.PM,
        '*1/*17': Phenotype.RM,
        '*17/*17': Phenotype.RM,
    },
    SLCO1B1: {
        '*1/*1': Phenotype.NM,
        '*1/*5': Phenotype.IM,
        '*1/*15': Phenotype.IM,
        '*5/*5': Phenotype.PM,
        '*15/*15': Phenotype.PM,
    },
    TPMT: {
        '*1/*1': Phenotype.NM,
        '*1/*2': Phenotype.IM,
        '*1/*3A': Phenotype.IM,
        '*1/*3C': Phenotype.IM,
        '*2/*2': Phenotype.PM,
        '*3A/*3A': Phenotype.PM,
        '*3C/*3C': Phenotype.PM,
    },
    DPYD: {
        '*1/*1': Phenotype.NM,
        '*1/*2A': Phenotype.IM,
        '*2A/*2A': Phenotype.PM,
    },
};

// ── CPIC Recommendations ──────────────────────────────────────────────────────

export const RECOMMENDATION_DATA: CPICRecommendation[] = [
    // CODEINE / CYP2D6
    {
        drug: 'CODEINE', phenotype: Phenotype.PM,
        risk_label: RiskLabel.INEFFECTIVE, severity: Severity.MODERATE,
        action: 'Avoid codeine. Select alternative analgesic.',
        evidence_level: 'A',
        dosing_recommendation: 'Do not use. Consider morphine or non-opioid analgesics.',
        mechanism: 'CYP2D6 poor metabolizers cannot convert codeine to morphine, resulting in inadequate analgesia.',
    },
    {
        drug: 'CODEINE', phenotype: Phenotype.IM,
        risk_label: RiskLabel.ADJUST_DOSAGE, severity: Severity.LOW,
        action: 'Use with caution; consider alternative analgesic.',
        evidence_level: 'A',
        dosing_recommendation: 'Start at 50% of normal dose. Monitor pain relief.',
        mechanism: 'Reduced CYP2D6 activity leads to lower morphine exposure and potential inadequate analgesia.',
    },
    {
        drug: 'CODEINE', phenotype: Phenotype.NM,
        risk_label: RiskLabel.SAFE, severity: Severity.NONE,
        action: 'Standard codeine dosing recommended.',
        evidence_level: 'A',
        dosing_recommendation: 'Standard dose per clinical guidelines.',
        mechanism: 'Normal CYP2D6 activity ensures appropriate codeine-to-morphine conversion.',
    },
    {
        drug: 'CODEINE', phenotype: Phenotype.UM,
        risk_label: RiskLabel.TOXIC, severity: Severity.HIGH,
        action: 'Avoid codeine. Risk of life-threatening toxicity.',
        evidence_level: 'A',
        dosing_recommendation: 'Contraindicated. Use non-opioid alternatives.',
        mechanism: 'Ultrarapid CYP2D6 activity converts codeine to toxic morphine levels rapidly, risking respiratory depression.',
    },

    // WARFARIN / CYP2C9
    {
        drug: 'WARFARIN', phenotype: Phenotype.PM,
        risk_label: RiskLabel.TOXIC, severity: Severity.HIGH,
        action: 'Reduce warfarin dose significantly. Monitor INR closely.',
        evidence_level: 'A',
        dosing_recommendation: 'Reduce initial dose by 25–50%. Frequent INR monitoring.',
        mechanism: 'Reduced CYP2C9 activity slows warfarin metabolism, increasing bleeding risk.',
    },
    {
        drug: 'WARFARIN', phenotype: Phenotype.IM,
        risk_label: RiskLabel.ADJUST_DOSAGE, severity: Severity.MODERATE,
        action: 'Consider lower initial warfarin dose.',
        evidence_level: 'A',
        dosing_recommendation: 'Reduce initial dose by 10–25%. Monitor INR weekly.',
        mechanism: 'Intermediate CYP2C9 activity results in higher warfarin plasma levels than normal.',
    },
    {
        drug: 'WARFARIN', phenotype: Phenotype.NM,
        risk_label: RiskLabel.SAFE, severity: Severity.NONE,
        action: 'Standard warfarin dosing per clinical protocol.',
        evidence_level: 'A',
        dosing_recommendation: 'Standard 5 mg initial dose. Routine INR monitoring.',
        mechanism: 'Normal CYP2C9 metabolism ensures predictable warfarin pharmacokinetics.',
    },

    // CLOPIDOGREL / CYP2C19
    {
        drug: 'CLOPIDOGREL', phenotype: Phenotype.PM,
        risk_label: RiskLabel.INEFFECTIVE, severity: Severity.HIGH,
        action: 'Avoid clopidogrel. Select alternative antiplatelet agent.',
        evidence_level: 'A',
        dosing_recommendation: 'Consider prasugrel or ticagrelor per clinician guidance.',
        mechanism: 'CYP2C19 poor metabolizers cannot activate clopidogrel, leading to inadequate platelet inhibition.',
    },
    {
        drug: 'CLOPIDOGREL', phenotype: Phenotype.IM,
        risk_label: RiskLabel.ADJUST_DOSAGE, severity: Severity.MODERATE,
        action: 'Consider alternative antiplatelet therapy.',
        evidence_level: 'B',
        dosing_recommendation: 'Prasugrel or ticagrelor preferred. Standard clopidogrel dose if alternatives unavailable.',
        mechanism: 'Reduced CYP2C19 activity leads to lower active metabolite exposure.',
    },
    {
        drug: 'CLOPIDOGREL', phenotype: Phenotype.NM,
        risk_label: RiskLabel.SAFE, severity: Severity.NONE,
        action: 'Standard clopidogrel dosing recommended.',
        evidence_level: 'A',
        dosing_recommendation: '75 mg daily per standard protocol.',
        mechanism: 'Normal CYP2C19 metabolism ensures adequate clopidogrel activation.',
    },
    {
        drug: 'CLOPIDOGREL', phenotype: Phenotype.RM,
        risk_label: RiskLabel.SAFE, severity: Severity.NONE,
        action: 'Standard clopidogrel dosing. Rapid metabolizer — monitor for bleeding.',
        evidence_level: 'B',
        dosing_recommendation: 'Standard 75 mg daily. Monitor for increased bleeding risk.',
        mechanism: 'Rapid CYP2C19 activity may increase active metabolite levels slightly.',
    },

    // SIMVASTATIN / SLCO1B1
    {
        drug: 'SIMVASTATIN', phenotype: Phenotype.PM,
        risk_label: RiskLabel.TOXIC, severity: Severity.HIGH,
        action: 'Avoid high-dose simvastatin. Consider alternative statin.',
        evidence_level: 'A',
        dosing_recommendation: 'Use ≤20 mg/day or switch to pravastatin/rosuvastatin.',
        mechanism: 'SLCO1B1 poor function reduces hepatic statin uptake, raising plasma levels and myopathy risk.',
    },
    {
        drug: 'SIMVASTATIN', phenotype: Phenotype.IM,
        risk_label: RiskLabel.ADJUST_DOSAGE, severity: Severity.MODERATE,
        action: 'Use lower simvastatin dose or consider alternative.',
        evidence_level: 'A',
        dosing_recommendation: 'Limit to 20–40 mg/day. Monitor for muscle symptoms.',
        mechanism: 'Intermediate SLCO1B1 function moderately increases simvastatin plasma concentrations.',
    },
    {
        drug: 'SIMVASTATIN', phenotype: Phenotype.NM,
        risk_label: RiskLabel.SAFE, severity: Severity.NONE,
        action: 'Standard simvastatin dosing recommended.',
        evidence_level: 'A',
        dosing_recommendation: 'Up to 40 mg/day per clinical guidelines.',
        mechanism: 'Normal SLCO1B1 function ensures effective hepatic simvastatin uptake.',
    },

    // AZATHIOPRINE / TPMT
    {
        drug: 'AZATHIOPRINE', phenotype: Phenotype.PM,
        risk_label: RiskLabel.TOXIC, severity: Severity.CRITICAL,
        action: 'Avoid azathioprine. Severe myelosuppression risk.',
        evidence_level: 'A',
        dosing_recommendation: 'Contraindicated. Use non-thiopurine immunosuppressants.',
        mechanism: 'TPMT poor metabolizers accumulate cytotoxic thioguanine nucleotides, causing fatal myelosuppression.',
    },
    {
        drug: 'AZATHIOPRINE', phenotype: Phenotype.IM,
        risk_label: RiskLabel.ADJUST_DOSAGE, severity: Severity.HIGH,
        action: 'Reduce azathioprine dose by 30–70%.',
        evidence_level: 'A',
        dosing_recommendation: 'Start at 30–70% of standard dose. Weekly CBC monitoring.',
        mechanism: 'Intermediate TPMT activity leads to elevated thioguanine levels; dose reduction minimizes toxicity.',
    },
    {
        drug: 'AZATHIOPRINE', phenotype: Phenotype.NM,
        risk_label: RiskLabel.SAFE, severity: Severity.NONE,
        action: 'Standard azathioprine dosing recommended.',
        evidence_level: 'A',
        dosing_recommendation: 'Standard 2–3 mg/kg/day. Routine CBC monitoring.',
        mechanism: 'Normal TPMT activity adequately metabolizes azathioprine without toxic accumulation.',
    },

    // FLUOROURACIL / DPYD
    {
        drug: 'FLUOROURACIL', phenotype: Phenotype.PM,
        risk_label: RiskLabel.TOXIC, severity: Severity.CRITICAL,
        action: 'Avoid fluorouracil. Life-threatening toxicity risk.',
        evidence_level: 'A',
        dosing_recommendation: 'Contraindicated. Select alternative chemotherapy regimen.',
        mechanism: 'DPYD deficiency prevents 5-FU catabolism, causing lethal drug accumulation.',
    },
    {
        drug: 'FLUOROURACIL', phenotype: Phenotype.IM,
        risk_label: RiskLabel.ADJUST_DOSAGE, severity: Severity.HIGH,
        action: 'Reduce fluorouracil dose by 25–50%.',
        evidence_level: 'A',
        dosing_recommendation: 'Start at 50–75% of standard dose. Monitor closely for toxicity.',
        mechanism: 'Intermediate DPYD activity reduces 5-FU clearance, increasing exposure and toxicity risk.',
    },
    {
        drug: 'FLUOROURACIL', phenotype: Phenotype.NM,
        risk_label: RiskLabel.SAFE, severity: Severity.NONE,
        action: 'Standard fluorouracil dosing recommended.',
        evidence_level: 'A',
        dosing_recommendation: 'Standard dose per oncology protocol.',
        mechanism: 'Normal DPYD activity ensures appropriate 5-FU catabolism.',
    },
];

// ── LLM Explanation snippets (keyed by DRUG_PHENOTYPE) ───────────────────────

export const LLM_EXPLANATIONS: Record<string, string> = {
    CODEINE_PM: 'Your CYP2D6 Poor Metabolizer status means codeine cannot be effectively converted to its active form (morphine) in your body. This results in little to no pain relief. Using codeine is not recommended — please discuss non-opioid or morphine-based alternatives with your doctor.',
    CODEINE_IM: 'Your CYP2D6 Intermediate Metabolizer status means your body converts codeine to morphine more slowly than normal. You may experience reduced pain relief. A lower starting dose and close monitoring are recommended.',
    CODEINE_NM: 'Your CYP2D6 Normal Metabolizer status means codeine is processed as expected, providing standard pain relief at standard doses.',
    CODEINE_UM: 'Your CYP2D6 Ultrarapid Metabolizer status means codeine is converted to morphine extremely rapidly, creating dangerously high opioid levels. This can cause respiratory depression. Codeine is contraindicated — please use non-opioid alternatives.',

    WARFARIN_PM: 'Your CYP2C9 Poor Metabolizer status means warfarin is broken down more slowly than normal, leading to higher drug levels and significantly increased bleeding risk. A substantially lower dose with very frequent INR monitoring is essential.',
    WARFARIN_IM: 'Your CYP2C9 Intermediate Metabolizer status results in somewhat elevated warfarin levels. A modestly reduced starting dose with frequent INR checks is recommended.',
    WARFARIN_NM: 'Your CYP2C9 Normal Metabolizer status means warfarin is processed at expected rates. Standard dosing with routine INR monitoring applies.',

    CLOPIDOGREL_PM: 'Your CYP2C19 Poor Metabolizer status means clopidogrel cannot be adequately converted to its active form. Platelet inhibition will be insufficient, leaving you at higher risk for cardiovascular events. An alternative antiplatelet such as prasugrel or ticagrelor is strongly recommended.',
    CLOPIDOGREL_IM: 'Your CYP2C19 Intermediate Metabolizer status results in reduced clopidogrel activation. Your doctor may prefer stronger antiplatelet therapy.',
    CLOPIDOGREL_NM: 'Your CYP2C19 Normal Metabolizer status means clopidogrel is fully activated and provides expected antiplatelet effects at standard doses.',
    CLOPIDOGREL_RM: 'Your CYP2C19 Rapid Metabolizer status means clopidogrel may be activated more than normal. Standard dosing is generally used, though your doctor may monitor for bleeding.',

    SIMVASTATIN_PM: 'Your SLCO1B1 Poor Function status dramatically increases simvastatin plasma levels, elevating your risk for myopathy (muscle damage). High-dose simvastatin should be avoided; a safer statin such as pravastatin or rosuvastatin is recommended.',
    SIMVASTATIN_IM: 'Your SLCO1B1 Intermediate Function status moderately raises simvastatin exposure. A lower dose with monitoring for muscle symptoms is advised.',
    SIMVASTATIN_NM: 'Your SLCO1B1 Normal Function status allows standard simvastatin uptake and metabolism, making standard dosing appropriate.',

    AZATHIOPRINE_PM: 'Your TPMT Poor Metabolizer status means azathioprine cannot be adequately broken down, causing dangerous accumulation of toxic metabolites. This leads to severe — potentially fatal — bone marrow suppression. Azathioprine is contraindicated in you.',
    AZATHIOPRINE_IM: 'Your TPMT Intermediate Metabolizer status indicates elevated thiopurine levels at standard doses. A 30–70% dose reduction with close blood count monitoring is required.',
    AZATHIOPRINE_NM: 'Your TPMT Normal Metabolizer status confirms adequate enzyme activity, making standard azathioprine dosing appropriate with routine monitoring.',

    FLUOROURACIL_PM: 'Your DPYD Poor Metabolizer status means 5-fluorouracil (5-FU) cannot be broken down, causing severe — potentially life-threatening — toxicity including mucositis, diarrhea, and bone marrow suppression. This chemotherapy is contraindicated for you.',
    FLUOROURACIL_IM: 'Your DPYD Intermediate Metabolizer status reduces 5-FU clearance. A 25–50% dose reduction is required to minimize toxicity while maintaining therapeutic efficacy.',
    FLUOROURACIL_NM: 'Your DPYD Normal Metabolizer status ensures adequate 5-FU metabolism, allowing standard oncology dosing under physician supervision.',
};
