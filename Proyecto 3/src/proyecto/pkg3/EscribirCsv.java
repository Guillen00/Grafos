/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyecto.pkg3;
import java.io.BufferedReader;
import java.io.EOFException;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.Arrays;
import java.util.Scanner;
/**
 *
 * @author leona
 */
public class EscribirCsv {

   static Scanner sc = new Scanner(System.in);
    static RandomAccessFile fichero = null;

    public static void main(String[] args) {
        String  nodos;
        String  aristas;
        String data [][] = null;
        try {
            //se abre el fichero para lectura y escritura
            fichero = new RandomAccessFile("C:\\Users\\leona\\Documents\\prueba.csv", "rw");
            mostrarFichero(); //muestra el contenido original del fichero
            System.out.print("Introduce nodos ");
            nodos = sc.nextLine(); //se lee el entero a añadir en el fichero
            data[0][0]= nodos;
            System.out.print("Introduce aristas");
            aristas = sc.nextLine();
            data[1][0]= aristas;
            fichero.seek(0); //nos situamos en un indice del fichero
            
            /* //se lee el entero a añadir en el fichero
            fichero.seek(nodos.length()+1);
            fichero.writeChars(aristas); */
                 //se escribe la palabra
            //mostrarFichero();//muestra el contenido del fichero después de añadir el número

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
