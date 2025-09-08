const fs = require('fs');
const path = require('path');

// Script Node.js pour préparer la conversion en PDF
console.log('📄 Préparation du fichier pour conversion PDF...');

// Lire le fichier Markdown
const markdownFile = 'CHATBOT_DETAILED_EXPLANATION.md';
const outputFile = 'CHATBOT_DETAILED_EXPLANATION_FOR_PDF.md';

if (fs.existsSync(markdownFile)) {
    let content = fs.readFileSync(markdownFile, 'utf8');
    
    // Ajouter une page de titre
    const titlePage = `---
title: "Fonctionnement Détaillé du Chatbot CPR"
subtitle: "Guide Technique Complet"
author: "Système d'IA Conversationnelle"
date: "${new Date().toLocaleDateString('fr-FR')}"
geometry: margin=2cm
fontsize: 11pt
documentclass: article
header-includes:
  - \\usepackage{fancyhdr}
  - \\pagestyle{fancy}
  - \\fancyhead[L]{Chatbot CPR - Guide Technique}
  - \\fancyhead[R]{${new Date().toLocaleDateString('fr-FR')}}
---

\\newpage

`;
    
    // Combiner le titre et le contenu
    const finalContent = titlePage + content;
    
    // Écrire le fichier optimisé pour PDF
    fs.writeFileSync(outputFile, finalContent, 'utf8');
    
    console.log(`✅ Fichier préparé : ${outputFile}`);
    console.log('\n📋 Instructions pour générer le PDF :');
    console.log('\n1. Installer pandoc :');
    console.log('   Mac: brew install pandoc');
    console.log('   Ubuntu: sudo apt install pandoc texlive-latex-base texlive-fonts-recommended');
    console.log('   Windows: https://pandoc.org/installing.html');
    console.log('\n2. Générer le PDF :');
    console.log(`   pandoc ${outputFile} -o CHATBOT_DETAILED_EXPLANATION.pdf --pdf-engine=pdflatex`);
    console.log('\n3. Ou utiliser une version simplifiée :');
    console.log(`   pandoc ${outputFile} -o CHATBOT_DETAILED_EXPLANATION.pdf`);
    
} else {
    console.error(`❌ Fichier ${markdownFile} non trouvé`);
}