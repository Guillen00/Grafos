
const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

//NOTA IMPORTANTE: Mis metodos no alteran el sample.json solo altero en memoria 
//Arreglo de grafos 
var graphs = require('../sample.json');

//#############################################


//METODOS GET PARA OBTENER LOS GRAFOS

//##############################################
//Recupera la lista de grafos creados en memoria
router.get('/', (req, res) => {
    res.json(graphs); I 

});


//############################################
//Recupera el grafo creado por ID

router.get('/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;

    // Searching graph for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            res.json(graph);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Graph not found');
});
//#############################################
//Recupera la lista de nodos del grafo identificado por id

router.get('/:id/nodes', (req, res) => { 
    const id = req.params.id;
    // Searching node for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            res.json(graph.nodes);
            return;
        }
    
    }
});

//################################################
//Recupera todas las aristas del grafo identificado por id

router.get('/:id/edges', (req, res) => { 
    const id = req.params.id;
    // Searching edge for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            res.json(graph.edges);
            return;
        }
    
    }
});

//#################################################
//GET /graph/{id}/degree

router.get('/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;

    // Searching graph for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            res.json(graph);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Graph not found');
});

//#################################################
//Obtiene la ruta más corta entre dos nodos

//NO SE LOGRO IMPLEMENTAR
router.get('/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;

    // Searching graph for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            res.json(graph);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Graph not found');
});

//###################################################

 //METODOS POST PARA ALMACENAR UN NUEVO GRAFO

 //##################################################
 //Almacen un nuevo grafo 
 //Atravez del metodo push inserto un nuevo objeto al final
 //Un nuevo grafo al final aumentando su ID 
//Crea un nuevo grafo
router.post('/', (req, res) => {
    const id = graphs.length + 1;
    const newGraph = { ...req.body, id };
    const { nodes, edges } = req.body;
    if (id && nodes && edges) {
        //Metodo push para insertar nuevo grafo al final
        graphs.push(newGraph);
        //Actualiza el arreglo de grafos
        res.json(graphs);
    } else {
        //Codigo de estado 500 con msj de error se da cuando el servidor tuvo un error al momento de procesar el dato
        res.status(500).json({error: 'There was an error.'});
    }
}); 

//################################################
//Crea un nuevo nodo en el grafo indicado por id
router.post('/:idg/nodes/', (req, res) => {
    const idg = req.params.idg;
    
    for (let graph of graphs) {
        if (graph.id === idg) {
            //const id2 = graph.nodes.length + 1;
            const {id, inDegree, outDegree, entity } = req.body;
            const newNode = { ...req.body };

            if (id && inDegree && outDegree && entity) {
                graph.nodes.push(newNode);
                res.json(graph.nodes);
            } else {
                res.status(500).json({error: 'There was an error.'});
            }
        }
    }
});

//################################################
//Crea un nuevo arista

router.post('/:idg/edges/', (req, res) => {
    const idg = req.params.idg;
    
    for (let graph of graphs) {
        if (graph.id === idg) {
            //const id2 = graph.nodes.length + 1;
            const {id, startId, endId, weight, sEntity, eEntity } = req.body;
            const newEdge = { ...req.body };

            if (id && startId && endId && weight && sEntity && eEntity) {
                graph.edges.push(newEdge);
                res.json(graph.edges);
            } else {
                res.status(500).json({error: 'There was an error.'});
            }
        }
    }
});
//###################################################


//METODOS PUT PARA ACTUALIZAR


//###################################################
//Actualiza los grafos agregados al arreglo por ID

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nodes, edges } = req.body;
    if (id && nodes && edges) {
        _.each(graphs, (graph, i) => {
            if (graph.id === id) {
                graph.node = node;
                graph.edges= edges;
        
            }
        });
        res.json(graphs);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

//#####################################################
//Actualiza la entidad almacenada en el nodo indicado.

router.put('/:id/nodes/:id2', (req, res) => { 
    const id = req.params.id;
    const id2 = req.params.id;
    const num = req.query.num;
    // Searching node for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            for (let node of graph.nodes) {
                if (node.id === id2) {
                    node.entity = num
                    res.json(node);
                    return;
                }
        }   }
    
    }
});

  //#########################################################
  //Actualiza la Arista
  router.put('/:id/edges/:id2', (req, res) => { 
    const id = req.params.id;
    const id2 = req.params.id;
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    const num3 = req.query.num3;
    // Searching node for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            for (let edge of graph.edges) {
                if (edge.id === id2) {
                    edge.startId = num1;
                    edge.endId =num2;
                    edge.weight = num3;
                    res.json(edge);
                    return;
                }
        }   }
    
    }
});
//###########################################################

//METODOS DELETE PARA ELIMINAR

//###########################################################
//Elimina los grafos en memoria

router.delete('/', (req, res) => {
    graphs = [];
        res.json(req.body.data);
    
});

//############################################################
//Elimina el grafo identificado por id.

/*Basicamente voy a recorrer todo mi arreglo de peliculas y obtengo un grafo
por cada vez que se recorra, si por cada grafo que estoy recorriendo
su ID es igual al ID que estoy recibiendo significa que encontro el grafo, por lo 
tanto proceda a removerlo*/ 
router.delete('/:id', (req, res) => {
    const {id} = req.params;
//"_.each empieza a recorrer el arreglo en este caso graphs"
    const {  nodes, edges } = req.body;
    _.each(graphs, (graph, i) => {
        if (graph.id == id) {
                //Metodo splice para revomer un solo grafo
                
            graphs.splice(i, 1);
        }
    });
    res.json(graphs);
    
    
});


//###############################################
//Elimina el nodo del grafo que se identifica por ID

router.delete('/:id/nodes/', (req, res) => { 
    const id = req.params.id;
    
    // Searching node for the id
    for (let graph of graphs) {
        if (graph.id === id) {
           graph.nodes = [];
           graph.edges = [];
           res.json(graph.nodes);
           
        }
    
    }
});
//##############################################
//Elimina todos los nodos del grafo identificado por id.
router.delete('/:id/nodes/:id2', (req, res) => { 
    const id = req.params.id;
    const id2 = req.params.id;
    // Searching node for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            var cont = 0
            for (let node of graph.nodes) {
                
                if (node.id === id2) {
                    graph.nodes.splice(cont, 1);
                    res.json(graph.nodes);
                }
                cont+=1
        }   }
    
    }
});

//################################################
//Elimina todas las aristas del grafo identificado por id

router.delete('/:id/edges/:id2', (req, res) => { 
    const id = req.params.id;
    const id2 = req.params.id;
    // Searching node for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            var cont = 0
            for (let edge of graph.edges) {
                
                if (edge.id === id2) {
                    graph.edges.splice(cont, 1);
                    res.json(graph.edges);
                }
                cont+=1
        }   }
    
    }
});

//##################################################
//Elimina el arista

router.delete('/:id/edges/', (req, res) => { 
    const id = req.params.id;
    
    // Searching edge for the id
    for (let graph of graphs) {
        if (graph.id === id) {
           graph.startId = [];
           graph.endId = [];
           graph.weight= [];
           graph.sEntity=[];
           graph.eEntity=[]
           res.json(graph.edges);
           
        }
    
    }
});

module.exports = router;

