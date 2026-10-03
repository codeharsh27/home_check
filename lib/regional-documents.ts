export type SupportedRegion = 'maharashtra' | 'karnataka' | 'tamilNadu' | 'delhiNcr' | 'general';
export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'kn' | 'ta';

export interface RegionalDocumentInfo {
  regionalTitle: string;
  localScript: string;
  legalContext: string;
  authority: string;
  verificationTip: string;
}

export const REGIONAL_METADATA: Record<
  SupportedRegion,
  { name: string; nativeName: string; defaultLanguage: SupportedLanguage }
> = {
  maharashtra: { name: 'Maharashtra', nativeName: 'महाराष्ट्र', defaultLanguage: 'mr' },
  karnataka: { name: 'Karnataka', nativeName: 'ಕರ್ನಾಟಕ', defaultLanguage: 'kn' },
  tamilNadu: { name: 'Tamil Nadu', nativeName: 'தமிழ்நாடு', defaultLanguage: 'ta' },
  delhiNcr: { name: 'Delhi / NCR / UP', nativeName: 'दिल्ली / उत्तर प्रदेश', defaultLanguage: 'hi' },
  general: { name: 'All India', nativeName: 'भारत', defaultLanguage: 'en' },
};

export const REGIONAL_DOCUMENTS: Record<
  SupportedRegion,
  Record<string, RegionalDocumentInfo>
> = {
  maharashtra: {
    item_ownership_title: {
      regionalTitle: 'Index II (सूची २) & Sale Deed',
      localScript: 'सूची क्रमांक २ (Index II)',
      legalContext: 'Official Sub-Registrar registration extract recording ownership transfer details and stamp duty paid.',
      authority: 'Sub-Registrar Office / IGR Maharashtra (igrmaharashtra.gov.in)',
      verificationTip: 'Cross-check doc registration number, flat unit number, and parking allocation on e-Search.',
    },
    item_tax_receipts: {
      regionalTitle: '7/12 Utara (सातबारा) & Property Tax Challan',
      localScript: '७/१२ उतारा (सातबारा) आणि फेरफार',
      legalContext: 'Land revenue record (Village Form VII & XII) showing title chain and mutation (Ferfar) entry.',
      authority: 'Talathi Office / MahaBhulekh Portal (bhulekh.mahabhumi.gov.in)',
      verificationTip: 'Ensure developer or land owner name is updated in the Ferfar (mutation) register without liabilities.',
    },
    item_ec: {
      regionalTitle: 'Nil Encumbrance / Form 15 (शोध अहवाल)',
      localScript: 'बोजा नसलेला दाखला (Nil Encumbrance)',
      legalContext: 'Sub-registrar certified record verifying no existing mortgage charges or bank attachments.',
      authority: 'Sub-Registrar / IGR Maharashtra',
      verificationTip: 'Request 30-year search report covering survey numbers before agreement signing.',
    },
    item_cc: {
      regionalTitle: 'Commencement Certificate (CC - बांधकाम सुरू दाखला)',
      localScript: 'बांधकाम आरंभ प्रमाणपत्र (CC)',
      legalContext: 'Municipal corporation authorization allowing construction up to approved plinth/floor levels.',
      authority: 'PMC / PCMC / BMC / CIDCO / MMRDA',
      verificationTip: 'Check if CC is valid for the specific tower and floor level of your flat.',
    },
    item_oc: {
      regionalTitle: 'Occupancy Certificate (OC - भोगवटा प्रमाणपत्र)',
      localScript: 'भोगवटा प्रमाणपत्र (OC)',
      legalContext: 'Mandatory completion certificate confirming building is constructed according to sanctioned layout.',
      authority: 'Municipal Corporation (PMC / PCMC / BMC)',
      verificationTip: 'Living without OC is illegal in Maharashtra and complicates water connections and resale.',
    },
    item_na_order: {
      regionalTitle: 'NA Order (अकृषिक परवाना - Non-Agricultural Order)',
      localScript: 'अकृषिक परवाना (NA Order)',
      legalContext: 'District Collector order converting agricultural land to residential building use.',
      authority: 'District Collectorate / Sub-Divisional Officer (SDO)',
      verificationTip: 'Verify Section 44/42 Maharashtra Land Revenue Code conversion sanction.',
    },
    item_bank_noc: {
      regionalTitle: 'Bank NOC / Flat Mortgage Release Letter',
      localScript: 'बँक ना-हरकत प्रमाणपत्र (NOC)',
      legalContext: 'Developer financing bank releases specific flat unit from project mortgage charges.',
      authority: 'Lending Bank / Financial Institution',
      verificationTip: 'Must mention your exact wing, flat number, and carpet area explicitly.',
    },
  },

  karnataka: {
    item_ownership_title: {
      regionalTitle: 'Mother Deed & 30-Year Absolute Sale Deed',
      localScript: 'ತಾಯಿದಸ್ತಾವೇಜು (Mother Deed)',
      legalContext: 'Continuous chain of registered conveyance deeds establishing unbroken legal ownership.',
      authority: 'Sub-Registrar / Kaveri Online Services (kaverionline.karnataka.gov.in)',
      verificationTip: 'Verify tracing of original land acquisition and all successive family partitions.',
    },
    item_tax_receipts: {
      regionalTitle: 'A-Khata Certificate & RTC / Pahani',
      localScript: 'ಎ-ಖಾತಾ ಮತ್ತು ಪಹಣಿ (A-Khata & RTC)',
      legalContext: 'Municipal assessment register confirming legal property tax assessment and civic compliance.',
      authority: 'BBMP / BDA / Bhoomi Portal',
      verificationTip: 'Beware of B-Khata properties; only A-Khata guarantees building approval and loan eligibility.',
    },
    item_ec: {
      regionalTitle: 'Encumbrance Certificate Form 15 (ಭಾರಮುಕ್ತ ಪ್ರಮಾಣಪತ್ರ)',
      localScript: 'ಫಾರಂ 15 (Form 15 Encumbrance Certificate)',
      legalContext: 'Official record of all registered property transactions and encumbrances for 15-30 years.',
      authority: 'Sub-Registrar Office / Kaveri Portal',
      verificationTip: 'Form 15 lists all past transactions; Form 16 indicates nil encumbrance.',
    },
    item_cc: {
      regionalTitle: 'Sanctioned Plan & Commencement Certificate',
      localScript: 'ಬಿಬಿಎಂಪಿ ಪ್ರಾರಂಭ ಪ್ರಮಾಣಪತ್ರ (BBMP CC)',
      legalContext: 'Zonal approval and commencement clearance issued by town planning authority.',
      authority: 'BBMP Town Planning / BDA / BMRDA',
      verificationTip: 'Confirm construction does not violate FAR (Floor Area Ratio) or setback norms.',
    },
    item_oc: {
      regionalTitle: 'Occupancy Certificate (ಸ್ವಾಧೀನ ಪ್ರಮಾಣಪತ್ರ - OC)',
      localScript: 'ಸ್ವಾಧೀನ ಪ್ರಮಾಣಪತ್ರ (Occupancy Certificate)',
      legalContext: 'BBMP clearance certifying residential occupancy fitness as per approved bylaws.',
      authority: 'BBMP Chief Engineer (Town Planning)',
      verificationTip: 'Without OC, permanent BESCOM power and BWSSB water connections may be denied.',
    },
    item_na_order: {
      regionalTitle: 'DC Conversion Order (Section 95 KLR Act)',
      localScript: 'ಡಿಸಿ ಭೂ ಪರಿವರ್ತನೆ ಆದೇಶ (DC Conversion)',
      legalContext: 'Deputy Commissioner sanction converting agricultural land to residential layout use.',
      authority: 'Deputy Commissioner (Bangalore Urban / Rural)',
      verificationTip: 'Verify conversion fine payment challan and official gazette notification.',
    },
  },

  tamilNadu: {
    item_ownership_title: {
      regionalTitle: 'Parent Documents & Registered Sale Deed (கிரய பத்திரம்)',
      localScript: 'கிரய பத்திரம் மற்றும் தாய் பத்திரம்',
      legalContext: 'Registered sale deed and 30-year antecedent title chain registered at SRO.',
      authority: 'Sub-Registrar Office / Tnreginet (tnreginet.gov.in)',
      verificationTip: 'Ensure all previous legal heirs signed previous partition and settlement deeds.',
    },
    item_tax_receipts: {
      regionalTitle: 'Patta / Chitta & TSLR Extract (பட்டா / சிட்டா)',
      localScript: 'பட்டா / சிட்டா மற்றும் அடங்கல்',
      legalContext: 'Revenue department register of title and land revenue tax assessment.',
      authority: 'Tahsildar / AnyServices Portal (eservices.tn.gov.in)',
      verificationTip: 'Patta must be in the name of the current promoter or vendor with matching survey number.',
    },
    item_ec: {
      regionalTitle: 'Villangam Certificate (வில்லங்கச் சான்றிதழ் - EC)',
      localScript: 'வில்லங்கச் சான்றிதழ் (Villangam Certificate)',
      legalContext: 'Sub-Registrar encumbrance certificate tracing registered charges for 30 years.',
      authority: 'Sub-Registrar / Tnreginet Portal',
      verificationTip: 'Download digital copy from Tnreginet to verify non-encumbrance.',
    },
    item_cc: {
      regionalTitle: 'CMDA / DTCP Planning Permission & Building Permit',
      localScript: 'திட்ட அனுமதி மற்றும் கட்டட அனுமதி',
      legalContext: 'Statutory planning permission and local body building license.',
      authority: 'CMDA (Chennai) / DTCP (Rest of TN) / Greater Chennai Corporation',
      verificationTip: 'Verify planning permit number on the official CMDA/DTCP portal.',
    },
    item_oc: {
      regionalTitle: 'Completion Certificate (CC / OC)',
      localScript: 'பணி நிறைவு சான்றிதழ் (Completion Certificate)',
      legalContext: 'CMDA compliance certificate required before power and water supply connection.',
      authority: 'CMDA / Local Municipal Corporation',
      verificationTip: 'Mandatory for power connection from TANGEDCO and CMWSSB water connections.',
    },
  },

  delhiNcr: {
    item_ownership_title: {
      regionalTitle: 'Bainama (बैनामा) / Conveyance Deed & Allotment Letter',
      localScript: 'बैनामा (Bainama / Sale Deed)',
      legalContext: 'Registered conveyance deed or development authority allotment lease deed.',
      authority: 'Sub-Registrar Office / DDA / NOIDA / HUDA',
      verificationTip: 'Verify tripartite agreement if purchasing sub-lease from original authority allottee.',
    },
    item_tax_receipts: {
      regionalTitle: 'Khasra-Khatauni (खसरा-खतौनी) & Dakhil Kharij',
      localScript: 'खसरा-खतौनी एवं दाखिल खारिज (Mutation)',
      legalContext: 'Land revenue jamabandi and mutation record validating official registry transfer.',
      authority: 'Tehsil Revenue Court / Bhulekh Portal',
      verificationTip: 'Check Jamabandi records for court stays or pending consolidation (Chakbandi) disputes.',
    },
    item_ec: {
      regionalTitle: 'Sub-Registrar Non-Encumbrance Search Report',
      localScript: 'भारमुक्त प्रमाणपत्र (Non-Encumbrance Report)',
      legalContext: 'Legal search report certifying freedom from mortgages and attachments.',
      authority: 'Sub-Registrar Office',
      verificationTip: 'Have a property lawyer inspect record books at local sub-registrar office.',
    },
    item_cc: {
      regionalTitle: 'Sanctioned Building Plan & Commencement Permit',
      localScript: 'स्वीकृत मानचित्र एवं निर्माण अनुमति (Sanctioned Plan)',
      legalContext: 'Development authority approved architectural layout and fire safety clearance.',
      authority: 'DDA / MCD / NOIDA Authority / DTCP Haryana',
      verificationTip: 'Check zero-period penalty disputes or pending builder dues on NOIDA/Greater Noida authority website.',
    },
    item_oc: {
      regionalTitle: 'Completion & Occupancy Certificate (OC)',
      localScript: 'पूर्णता एवं अधिभोग प्रमाणपत्र (Completion & OC)',
      legalContext: 'Official authority certificate certifying building completion and structural safety.',
      authority: 'Development Authority (NOIDA / DDA / DTCP Haryana)',
      verificationTip: 'Ensure sub-lease registry is permissible; un-cleared builder dues can freeze flat registry.',
    },
  },

  general: {
    item_ownership_title: {
      regionalTitle: 'Registered Sale Deed & Mother Deed',
      localScript: 'Registered Conveyance Deed',
      legalContext: 'Registered title deed establishing uninterrupted 30-year ownership transfer chain.',
      authority: 'Sub-Registrar Office',
      verificationTip: 'Verify registration volume and page numbers at the local sub-registrar office.',
    },
    item_tax_receipts: {
      regionalTitle: 'Land Revenue Mutation Extract & Property Tax',
      localScript: 'Revenue Title Extract & Tax Receipts',
      legalContext: 'Municipal corporation tax assessment and revenue office mutation record.',
      authority: 'Local Municipal Corporation / Revenue Office',
      verificationTip: 'Ensure seller has paid all past dues and holds the latest property tax challan.',
    },
    item_ec: {
      regionalTitle: 'Encumbrance Certificate (13–30 Years)',
      localScript: 'Encumbrance Certificate',
      legalContext: 'Sub-registrar certified report of all registered transactions and legal charges.',
      authority: 'Sub-Registrar Office',
      verificationTip: 'Request a minimum 13-year search; 30-year search is recommended for full peace of mind.',
    },
  },
};

/**
 * Auto-detect region based on city or location string
 */
export function detectRegionFromLocation(location: string = ''): SupportedRegion {
  const loc = location.toLowerCase();

  // Maharashtra
  if (
    loc.includes('pune') ||
    loc.includes('mumbai') ||
    loc.includes('thane') ||
    loc.includes('wakad') ||
    loc.includes('hinjewadi') ||
    loc.includes('baner') ||
    loc.includes('kharadi') ||
    loc.includes('navi mumbai') ||
    loc.includes('nagpur') ||
    loc.includes('nashik') ||
    loc.includes('maharashtra')
  ) {
    return 'maharashtra';
  }

  // Karnataka
  if (
    loc.includes('bangalore') ||
    loc.includes('bengaluru') ||
    loc.includes('whitefield') ||
    loc.includes('koramangala') ||
    loc.includes('indiranagar') ||
    loc.includes('bellandur') ||
    loc.includes('electronic city') ||
    loc.includes('mysore') ||
    loc.includes('karnataka')
  ) {
    return 'karnataka';
  }

  // Tamil Nadu
  if (
    loc.includes('chennai') ||
    loc.includes('coimbatore') ||
    loc.includes('omr') ||
    loc.includes('velachery') ||
    loc.includes('madurai') ||
    loc.includes('tamil nadu')
  ) {
    return 'tamilNadu';
  }

  // Delhi / NCR / UP
  if (
    loc.includes('delhi') ||
    loc.includes('noida') ||
    loc.includes('gurgaon') ||
    loc.includes('gurugram') ||
    loc.includes('ghaziabad') ||
    loc.includes('faridabad') ||
    loc.includes('haryana') ||
    loc.includes('uttar pradesh')
  ) {
    return 'delhiNcr';
  }

  return 'general';
}

/**
 * Get regional document information for a specific checklist item
 */
export function getRegionalDocumentInfo(
  itemId: string,
  region: SupportedRegion = 'general'
): RegionalDocumentInfo | null {
  const regionDict = REGIONAL_DOCUMENTS[region] || REGIONAL_DOCUMENTS.general;
  return regionDict[itemId] || REGIONAL_DOCUMENTS.general[itemId] || null;
}
