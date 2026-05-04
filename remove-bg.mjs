import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';

async function removeBg() {
  const inputPath = path.resolve('public/Quem Somos/Foto-Dr.-Antonio-Nunes.png');
  const outputPath = path.resolve('public/Quem Somos/Foto-Dr.-Antonio-Nunes-bg-removed.png');

  // Convert to file URI to fix the "Unsupported protocol: c:" error on Windows
  const fileUri = 'file:///' + inputPath.replace(/\\/g, '/');

  console.log('Removing background from:', fileUri);
  
  try {
    const blob = await removeBackground(fileUri);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);
    console.log('Successfully removed background and saved to:', outputPath);
  } catch (err) {
    console.error('Error removing background:', err);
  }
}

removeBg();
