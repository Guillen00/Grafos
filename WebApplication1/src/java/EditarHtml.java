/*
 * En esta clase se copia el archivo original para editar uno secundario y se le añaden las listas de datos de notos y aristas 
 */

import java.io.EOFException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.RandomAccessFile;
import java.util.Scanner;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;


public class EditarHtml {

    static Scanner sc = new Scanner(System.in);
    static RandomAccessFile fichero = null;
    public static void main(String[] args) {
    //public void EditarHtml(Object[][] datos) {
        String  numero;
        try {
            String fromFile = "C:\\Users\\leona\\Desktop\\lee datos - copia (2).html";
            String toFile = "C:\\Users\\leona\\Desktop\\lee lista.html";
            boolean result = copyFile(fromFile, toFile);
            System.out.println(result?
            "Success! File copying (Éxito! Fichero copiado)":
                "Error! Failed to copy the file (Error! No se ha podido copiar el fichero)");

            //se abre el fichero para lectura y escritura
            fichero = new RandomAccessFile("C:\\Users\\leona\\Desktop\\lee lista.html", "rw");
            mostrarFichero(); //muestra el contenido original del fichero
            System.out.print("Introduce una palabra  para añadir al final del fichero: ");
            numero = sc.nextLine(); //se lee el entero a añadir en el fichero
            fichero.seek(746); //nos situamos en un indice del fichero
            fichero.writeChars(numero);       //se escribe la palabra
            mostrarFichero();//muestra el contenido del fichero después de añadir el número

        } catch (FileNotFoundException ex) {
            System.out.println(ex.getMessage());
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        } finally {
            try {
                if (fichero != null) {
                    fichero.close();
                }
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
    }

    public static void mostrarFichero() {
        int n;
        String y;
        
        try {
            fichero.seek(0); //nos situamos al principio
            while (fichero.readLine()!= null) {
                y= fichero.readLine();
                //n = fichero.readInt();  //se lee  un entero del fichero
                System.out.println(y);  //se muestra en pantalla
            }
        } catch (EOFException e) {
            System.out.println("Fin de fichero");
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
    }
    public static boolean copyFile(String fromFile, String toFile) {
        File origin = new File(fromFile);
        File destination = new File(toFile);
        if (origin.exists()) {
            try {
                InputStream in = new FileInputStream(origin);
                OutputStream out = new FileOutputStream(destination);
                // We use a buffer for the copy (Usamos un buffer para la copia).
                byte[] buf = new byte[1024];
                int len;
                while ((len = in.read(buf)) > 0) {
                    out.write(buf, 0, len);
                }
                in.close();
                out.close();
                return true;
            } catch (IOException ioe) {
                ioe.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
    }
                }
