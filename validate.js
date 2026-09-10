/**
 * TutorsGo Database Validator
 * Validates tutors.json against schema.json
 */
const fs = require('fs');
const path = require('path');

function validate() {
  const dataPath = path.join(__dirname, 'tutors.json');
  const schemaPath = path.join(__dirname, 'schema.json');

  if (!fs.existsSync(dataPath)) {
    console.error('❌ Error: tutors.json not found');
    process.exit(1);
  }

  if (!fs.existsSync(schemaPath)) {
    console.error('❌ Error: schema.json not found');
    process.exit(1);
  }

  const rawData = fs.readFileSync(dataPath, 'utf8');
  let data;
  try {
    data = JSON.parse(rawData);
  } catch (err) {
    console.error('❌ JSON Syntax Error in tutors.json:', err.message);
    process.exit(1);
  }

  if (!Array.isArray(data)) {
    console.error('❌ Root of tutors.json must be an Array');
    process.exit(1);
  }

  const validDistricts = [
    'Dimapur', 'Kohima', 'Mokokchung', 'Chümoukedima',
    'Tuensang', 'Wokha', 'Zunheboto', 'Phek',
    'Mon', 'Peren', 'Longleng', 'Kiphire',
    'Noklak', 'Shamator', 'Tseminyu', 'Niuland'
  ];

  let errors = 0;
  const seenIds = new Set();

  data.forEach((tutor, idx) => {
    const prefix = `[Entry #${idx + 1} (${tutor.id || 'NO_ID'})]`;
    
    if (!tutor.id || !/^TG-[0-9]{4}-[0-9]{3,}$/.test(tutor.id)) {
      console.error(`${prefix} Invalid ID format (expected TG-YYYY-XXX)`);
      errors++;
    }
    if (seenIds.has(tutor.id)) {
      console.error(`${prefix} Duplicate ID detected: ${tutor.id}`);
      errors++;
    }
    seenIds.add(tutor.id);

    if (!tutor.name || typeof tutor.name !== 'string' || tutor.name.trim().length < 2) {
      console.error(`${prefix} Missing or invalid 'name'`);
      errors++;
    }

    if (!validDistricts.includes(tutor.district)) {
      console.error(`${prefix} Invalid district: "${tutor.district}". Must be one of: ${validDistricts.join(', ')}`);
      errors++;
    }

    if (!tutor.area || typeof tutor.area !== 'string') {
      console.error(`${prefix} Missing or invalid 'area'`);
      errors++;
    }

    if (!Array.isArray(tutor.subjects) || tutor.subjects.length === 0) {
      console.error(`${prefix} 'subjects' must be a non-empty array of strings`);
      errors++;
    }

    if (typeof tutor.monthly_fee !== 'number' || tutor.monthly_fee < 0) {
      console.error(`${prefix} 'monthly_fee' must be a non-negative number`);
      errors++;
    }

    if (!tutor.phone || !/^[0-9]{10,13}$/.test(tutor.phone)) {
      console.error(`${prefix} 'phone' must be 10-13 digits without + sign`);
      errors++;
    }

    if (!tutor.maps_url || !/^https?:\/\/(maps\.google\.com|goo\.gl\/maps|maps\.app\.goo\.gl|www\.google\.com\/maps).*/.test(tutor.maps_url)) {
      console.error(`${prefix} 'maps_url' must be a valid Google Maps URL`);
      errors++;
    }

    if (typeof tutor.verified !== 'boolean') {
      console.error(`${prefix} 'verified' must be a boolean`);
      errors++;
    }
  });

  if (errors > 0) {
    console.error(`\n❌ Validation Failed with ${errors} error(s).`);
    process.exit(1);
  }

  console.log(`✅ Validation Passed: ${data.length} tutor profiles verified and structured correctly.`);
}

validate();
