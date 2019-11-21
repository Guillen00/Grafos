/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyecto.pkg3;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;

/**
 *
 * @author leona
 */
public class Cvs {
  public static final String SEPARATOR=";";
   public static final String QUOTE="\"";

   public static void main(String[] args) throws IOException {

      BufferedReader br = null;
      
      try {
         
         br =new BufferedReader(new FileReader("C:\\Users\\leona\\Documents\\prueba.csv"));
         String line = br.readLine();
         while (null!=line) {
            String [] fields = line.split(SEPARATOR);
            System.out.println(Arrays.toString(fields));
            
            //fields = removeTrailingQuotes(fields);
            
            
            line = br.readLine();
         }
         
      } catch (IOException e) {
         
      } finally {
         if (null!=br) {
            br.close();
         }
      }  
}}
