// eslint-disable-next-line
import pdfmake from 'pdfmakeSp';
// eslint-disable-next-line
import vsfonts from 'vfsfontsSp';
try {
    pdfmake.vfs = vsfonts.pdfMake.vfs;
} catch(e) {
    console.log(e);
}

export default pdfmake;
