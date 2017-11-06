package es.carlosborg;

import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.pdf.ocg.OCGRemover;
import com.itextpdf.text.pdf.parser.PdfTextExtractor;

import java.io.FileOutputStream;

/**
 * Hello world!
 *
 */
public class App 
{
    public final String kAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private String filepath;

    public App(String filepath) {
        this.filepath = filepath;
    }

    public void showPdfInfo() throws Exception {
        PdfReader reader = new PdfReader(this.filepath);
        System.out.println("This PDF has "+reader.getNumberOfPages()+" pages.");
        String page = PdfTextExtractor.getTextFromPage(reader, 2);
        System.out.println("Page Content:\n\n"+page+"\n\n");
        System.out.println("Is this document tampered: "+reader.isTampered());
        System.out.println("Is this document encrypted: "+reader.isEncrypted());
        System.out.println("Cracking password...");
        System.out.println("Password is: " + crackPassword());
    }

    public String crackPassword() throws Exception {
        PdfCracker cracker = new PdfCracker("/tmp/target.pdf");
        return cracker.crackViaBruteForce(kAlphabet);
    }

    public void removeLayer() throws Exception {
        PdfReader reader = new PdfReader(this.filepath);
        PdfStamper stamp = new PdfStamper(reader, new FileOutputStream("/tmp/target-no-layer.pdf"));
        stamp.getPdfLayers();
        // TODO : Remover Layer
//        OCGRemover remover = new OCGRemover();
//        remover.removeLayers(reader, );
    }

    public static void main(String[] args) throws Exception {
        System.out.println(args[0]);
        App app = new App(args[0]);
        app.showPdfInfo();
    }

}