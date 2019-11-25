/*
 * Esta clase se encarga de pasar los datos de aristas y nodos que tenian los grafos a un archivo CSV el cual contendra los nodos y aristas ,para metodos de la 
 *interfase se elimina el anterior porque estos serán almacenados en memoria en el servidor , y se sustituira el archivo creado anteriormente 
 */


import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
 
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.commons.collections4.ListValuedMap;
public class CrearFicherosExcel {
    /**
     * Constructor 
     */
        public CrearFicherosExcel(){}
        
        /**
     * Pasa la información al archivo csv crenadolo nuevo 
     */
	public void pasar_csv(Object [][] document,int nodos,int aristas) {
		
		String nombreArchivo="Inventario_new.csv";
		String rutaArchivo= "C:\\Users\\leona\\Desktop\\"+nombreArchivo;
		String hoja="Hoja1";
		
		XSSFWorkbook libro= new XSSFWorkbook();
		XSSFSheet hoja1 = libro.createSheet(hoja);
		
		CellStyle style = libro.createCellStyle();
                XSSFFont font = libro.createFont();
                font.setBold(true);
                style.setFont(font);
        
        
		/**
     * Genera los datos del documento
     */
		for (int i = 0; i <= document.length-1; i++) {
			XSSFRow row=hoja1.createRow(i);//se crea las filas
			
			if (i==0) {//para la cabecera
                            int j = 0;
                            while( j < nodos){
					XSSFCell cell= row.createCell(j);//se crea las celdas para la cabecera, junto con la posición
					//cell.setCellStyle(style); // se añade el style crea anteriormente 
					cell.setCellValue((String) document[0][j]);//se añade el contenido
                                        j++;
                            }
                                
			}
                        else{   //para el contenido
                            int j = 0;
                            while( j < aristas){
				XSSFCell cell= row.createCell(j);//se crea las celdas para la contenido, junto con la posición
				cell.setCellValue((String) document[1][j]); //se añade el contenido
                                j++;
			}}				
			
		}
		/**
     * Revisa si el archivo fue creado , si esta creado lo sustituye y sino lo guarda nada más
     */
		File file;
		file = new File(rutaArchivo);
		try (FileOutputStream fileOuS = new FileOutputStream(file)){						
			if (file.exists()) {// si el archivo existe se elimina
				file.delete();
				System.out.println("Archivo eliminado");
			}
			libro.write(fileOuS);
			fileOuS.flush();
			fileOuS.close();
			System.out.println("Archivo Creado");
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}catch (IOException e) {
			e.printStackTrace();
		}
		
 
	}
 
}