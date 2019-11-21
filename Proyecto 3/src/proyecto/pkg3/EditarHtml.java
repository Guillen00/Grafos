/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyecto.pkg3;
import java.io.EOFException;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.Scanner;

public class EditarHtml {

    static Scanner sc = new Scanner(System.in);
    static RandomAccessFile fichero = null;

    public static void main(String[] args) {
        String  numero;
        try {
            //se abre el fichero para lectura y escritura
            fichero = new RandomAccessFile("C:\\Users\\leona\\Desktop\\lee datos - copia.html", "rw");
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
}