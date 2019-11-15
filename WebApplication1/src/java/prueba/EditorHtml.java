package prueba;



/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author leona
 */
import javax.swing.JEditorPane;
import javax.swing.event.HyperlinkEvent;
import javax.swing.event.HyperlinkListener;
import javax.swing.text.html.HTMLEditorKit;

/**
 * Pequeño visor de páginas html 
 * @author Chuidiang
 */
public class EditorHtml extends JEditorPane
{
    /**
     * serial uid
     */
    private static final long serialVersionUID = 3257844398468511543L;
    
    /**
     * Listener para el tratamiento del click en los hipervínculos, haciendo
     * que el navegador muestre la página apuntada por el hipervínculo.
     */
    private HyperlinkListener listener = new HyperlinkListener()
    {
        /** Nos llamarán aquí cada vez que hay cualquier evento de ratón sobre
         * un hipervínculo: movimiento del ratón por encima, clicks, etc.
         */
        public void hyperlinkUpdate(HyperlinkEvent e)
        {
            try
            {
                // Se comprueba si se ha hecho click
                if (e.getEventType() == HyperlinkEvent.EventType.ACTIVATED)
                {
                    // se obtiene la url a la que apunta el hiperlink
                    if (e.getURL() != null)
                    {
                        // Se pasa la página al editor
                        setPage(e.getURL().toString());
                    }
                }
            } catch (Exception e2)
            {
                // No se hace nada en caso de error.
            }
        }
    };
    
    /**
     * Construye una instancia de esta clase.
     * Es un JEditorPane preparado para html, no editable.
     */
    public EditorHtml()
    {
        HTMLEditorKit kit = new HTMLEditorKit();
        setEditorKitForContentType("text/html", kit);
        setEditable(false);
        kit.install(this);
        addHyperlinkListener(listener);
    }

}