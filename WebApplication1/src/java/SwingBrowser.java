/*
 * Esta clase se encarga de crear el grafo en el jPanel, practicamente crea un navegador en el cual proyectamos el html
 */


import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

import java.net.MalformedURLException;
import java.net.URL;
import javafx.application.Platform;
import javafx.embed.swing.JFXPanel;
import javafx.scene.Scene;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;

public class SwingBrowser extends JFXPanel {
    /**
     * Variable encargada de renderizar el website
     */


    private WebEngine engine;
    /**
     * Constructor de la clase
     */
    
    public SwingBrowser() {
        Platform.runLater(new Runnable() {
            @Override
            public void run() {
                WebView view = new WebView();
                engine = view.getEngine();
                setScene(new Scene(view));
            }
        });
        setVisible(true);
    }
    /**
     * Método para cargar la URL de la página web
     */

    public void loadURL(final String url) {
        Platform.runLater(new Runnable() {
            @Override
            public void run() {
                String tmp = toURL(url);
                if (tmp == null) {
                    tmp = toURL(url);
                }
                engine.load(tmp);

            }
        });
    }
    /**
     * Intenta pasar el string en un url y si no se puede retorna null
     */
    private String toURL(String str) {
        try {
            return new URL(str).toExternalForm();
        } catch (MalformedURLException exception) {
            return null;
        }
    }
}