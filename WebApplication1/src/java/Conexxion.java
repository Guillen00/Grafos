/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import java.awt.List;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 *
 * @author leona
 */
public class Conexxion {
    //Creando un request y parametros de resquest
    public static void proyecto() throws MalformedURLException, IOException{
    //conectar
    String paramValue = "3000\\api\\graphs";
    String yourURLStr = "http://172.20.10.2:3000/api/graphs/";
    URL url = new URL(yourURLStr);
    HttpURLConnection con = (HttpURLConnection) url.openConnection();
    con.setRequestMethod("GET");
    System.out.println("conecto");
    /**
     * @param args the command line arguments
     */
    
    Map<String, String> parameters = new HashMap<>();
    parameters.put("param1", "val");
    con.setDoOutput(true);
    System.out.println("PASO");
    DataOutputStream out = new DataOutputStream(con.getOutputStream());
    out.writeBytes(getParamsString(parameters));
    out.flush();
    out.close();
    
    
    int status = con.getResponseCode();
    BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer content = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
        content.append(inputLine);
        }
    in.close();
    con.disconnect();
        
    System.out.println(content);
    }
    
    //public class ParameterStringBuilder {
    

    //Parametros 
    
    public static String getParamsString(Map<String, String> params) 
      throws UnsupportedEncodingException{
        StringBuilder result = new StringBuilder();
 
        for (Map.Entry<String, String> entry : params.entrySet()) {
          result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
          result.append("=");
          result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
          result.append("&");
        }
 
        String resultString = result.toString();
        return resultString.length() > 0
          ? resultString.substring(0, resultString.length() - 1)
          : resultString;
   // }
}
    
    public static String getFullResponse(HttpURLConnection con) throws IOException {
        StringBuilder fullResponseBuilder = new StringBuilder();
        fullResponseBuilder.append(con.getResponseCode())
        .append(" ")
        .append(con.getResponseMessage())
        .append("\n");
        // read status and message
 
        // read headers
 
        // read response content
                con.getHeaderFields().entrySet().stream()
          .filter(entry -> entry.getKey() != null)
          .forEach(entry -> {
              fullResponseBuilder.append(entry.getKey()).append(": ");
              java.util.List<String> headerValues = entry.getValue();
              Iterator it = headerValues.iterator();
              if (it.hasNext()) {
                  fullResponseBuilder.append(it.next());
                  while (it.hasNext()) {
                      fullResponseBuilder.append(", ").append(it.next());
                  }
              }
              fullResponseBuilder.append("\n");
        });
        return fullResponseBuilder.toString();
    }
     public static void main(String args[]) throws IOException {
         proyecto();
    }
}
    
        
   

