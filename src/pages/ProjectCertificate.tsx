import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Download, Award } from 'lucide-react';

const ProjectCertificate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const isFrench = i18n.language === 'fr';
  const certRef = useRef<HTMLDivElement>(null);

  const childName = searchParams.get('name') || 'Young Coder';
  const projectName = searchParams.get('projectName') || 'Supermarket Project';
  const today = new Date().toLocaleDateString(isFrench ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDownload = () => {
    if (!certRef.current) return;
    // Use html2canvas-like approach via print
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const certHtml = certRef.current.innerHTML;
    printWindow.document.write(`
      <html>
        <head>
          <title>KiddyKode Certificate - ${childName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap');
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: white; }
            .cert-container { width: 800px; padding: 60px; border: 8px double #f59e0b; border-radius: 16px; text-align: center; position: relative; background: linear-gradient(135deg, #fffbeb, #fff7ed); }
            .cert-border { position: absolute; inset: 12px; border: 2px solid #f59e0b; border-radius: 12px; pointer-events: none; }
            .cert-title { font-family: 'Playfair Display', serif; font-size: 42px; color: #92400e; margin-bottom: 8px; }
            .cert-subtitle { font-family: 'Inter', sans-serif; font-size: 16px; color: #b45309; margin-bottom: 30px; }
            .cert-name { font-family: 'Playfair Display', serif; font-size: 36px; color: #ea580c; border-bottom: 3px solid #f59e0b; padding-bottom: 8px; display: inline-block; margin: 20px 0; }
            .cert-text { font-family: 'Inter', sans-serif; font-size: 16px; color: #78350f; line-height: 1.6; }
            .cert-project { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 600; color: #ea580c; margin: 16px 0; }
            .cert-date { font-family: 'Inter', sans-serif; font-size: 14px; color: #92400e; margin-top: 30px; }
            .cert-logo { font-size: 48px; margin-bottom: 10px; }
            .cert-badge { font-size: 60px; margin: 20px 0; }
            .cert-footer { font-family: 'Inter', sans-serif; font-size: 12px; color: #b45309; margin-top: 20px; }
            @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          <div class="cert-container">
            <div class="cert-border"></div>
            ${certHtml}
          </div>
          <script>setTimeout(() => { window.print(); window.close(); }, 500);</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-900 p-4">
      {/* Header */}
      <div className="container mx-auto flex items-center gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/create')}
          className="p-2 rounded-xl bg-white dark:bg-gray-800 shadow-md"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </motion.button>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Award className="w-6 h-6 text-yellow-500" />
          {isFrench ? 'Ton Certificat' : 'Your Certificate'}
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl font-bold shadow-lg"
        >
          <Download className="w-5 h-5" />
          {isFrench ? 'Télécharger / Imprimer' : 'Download / Print'}
        </motion.button>
      </div>

      {/* Certificate Preview */}
      <div className="container mx-auto flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-100 dark:to-orange-100 rounded-2xl shadow-2xl w-full max-w-[800px] p-12 text-center relative"
          style={{ border: '8px double #f59e0b' }}
        >
          <div className="absolute inset-3 border-2 border-yellow-500 rounded-xl pointer-events-none" />
          
          <div ref={certRef}>
            <div className="cert-logo text-5xl mb-2">🏆</div>
            <h2 className="text-4xl font-bold text-amber-900 mb-1" style={{ fontFamily: 'serif' }}>
              {isFrench ? 'Certificat d\'Accomplissement' : 'Certificate of Achievement'}
            </h2>
            <p className="text-amber-700 text-sm mb-8">KiddyKode Academy</p>

            <p className="text-amber-800 text-base mb-2">
              {isFrench ? 'Ceci certifie que' : 'This certifies that'}
            </p>

            <div className="text-3xl font-bold text-orange-600 border-b-3 border-yellow-500 inline-block pb-2 mb-4" style={{ fontFamily: 'serif', borderBottom: '3px solid #f59e0b' }}>
              {childName}
            </div>

            <p className="text-amber-800 text-base mb-2">
              {isFrench ? 'a complété avec succès le projet' : 'has successfully completed the project'}
            </p>

            <p className="text-xl font-semibold text-orange-600 mb-4">
              "{projectName}"
            </p>

            <div className="cert-badge text-6xl my-4">⭐</div>

            <p className="text-amber-800 text-sm mb-1">
              {isFrench 
                ? 'Démontrant des compétences en programmation Python incluant les variables, les entrées, les calculs et les conditions.'
                : 'Demonstrating Python programming skills including variables, inputs, calculations, and conditionals.'}
            </p>

            <p className="text-amber-700 text-sm mt-6">{today}</p>
            <p className="text-amber-600 text-xs mt-4">www.kiddykode.com</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCertificate;
