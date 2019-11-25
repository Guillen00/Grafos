const { Router } = require('express');
const router = new Router();
const _ = require('underscore');
const bodyParser = require("body-parser");
//NOTA IMPORTANTE: Mis metodos no alteran el sample.json solo altero en memoria 

//Arreglo de grafos
var graphs = require('../sample.json');

router.use(bodyParser.json());

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//METODOS GET PARA OBTENER LOS GRAFOS

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Recupera la lista de grafos creados en memoria


router.get('/', (req, res) => {
    res.json(graphs);
});

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
///Recupera el grafo creado por ID

router.get('/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;
    //console.log(typeof id);

    // Searching graph for the id
    for (let graph of graphs) {
        //console.log(graph.id)
        if (graph.id === id) {
            res.json(graph);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Graph not found');
});

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

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
    res.status(500).send('Graph not found');
});

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Recupera un nodo especifico en el grafo

router.get('/:id/nodes/:id2', (req, res) => { 
    const id = req.params.id;
    const id2 = req.params.id;
    // Searching node for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            for (let node of graph.nodes) {
                if (node.id === id2) {
                    res.json(node);
                    return;
                }
        }   }
    
    }
});

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
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


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
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

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//METODOS POST PARA ALMACENAR UN NUEVO GRAFO


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Crea nuevos grafos para agregar en el arreglo
//Tambien se puede decir almacena nuevos grafos en el arreglos

router.post('/', (req, res) => {
    //Se presenta un bug en las dos siguientes lineas

    //const id = graphs.length + 1;
    const id = req.params.id;
    const { nodes, edges } = req.body;
    const newGraph = { ...req.body, id };
    if (id && nodes && edges) {
        graphs.push(newGraph);
        res.json(graphs);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Crea nuevas aristas en un grafo que se identifica por su ID
router.post('/:idg/edges/', (req, res) => {
    const idg = req.params.idg;
    
    for (let graph of graphs) {
        if (graph.id === idg) {
            //const id2 = graph.nodes.length + 1;
            const {id, start, end, weight } = req.body;
            const newEdge = { ...req.body };

            if (id && start && end && weight) {
                graph.edges.push(newEdge);
                res.json(graph.edges);
            } else {
                res.status(500).json({error: 'There was an error.'});
            }
        }
    }
});


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Crea nuevos nodos en un grafo que se identifica por su ID
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


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


//METODOS PUT PARA ACTUALIZAR


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Actualiza un grafo especificado por ID 

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nodes, edges } = req.body;
    if (id && nodes && edges) {
        _.each(graphs, (graph, i) => {
            if (graph.id === id) {
                graph.nodes = nodes;
                graph.edges= edges;
        
            }
        });
        res.json(graphs);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Actualiza un nodo especifico dentro de un grafo especifico

router.put('/:id/nodes/:id2', (req, res) => { 
    const id = req.params.id;
    const id2 = req.params.id;
    // Searching node for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            for (let node of graph.nodes) {
                if (node.id === id2) {
                    
                    res.json(node);
                    return;
                }
        }   }
    
    }
});


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Actualiza una arista especifica dentro de un grafo especificado por ID

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

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


//METODOS DELETE PARA ELIMINAR


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Elimina los grafos del arreglo


router.delete('/', (req, res) => {
    graphs = [];
        res.json(req.body.data);
    
});


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Elimina un grafo especificado por su ID 

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(graphs, (graph, i) => {
            if (graph.id == id) {
                graphs.splice(i, 1);
            }
        });
        res.json(graphs);
    }
});


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Elimina un nodo espeficado por su ID dentro de un grafo especificado por su ID


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

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Elimina todos los nodos de un grafo especificado por su ID


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

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Elimina todas las aristas de un grafo espeficiado por su ID

router.delete('/:id/edges/', (req, res) => { 
    const id = req.params.id;
    
    // Searching edge for the id
    for (let graph of graphs) {
        if (graph.id === id) {
            graph.nodes = [];
            graph.edges = [];
            res.json(graph.edges);
           
        }
    
    }
});

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Elimina una arista especificada por su ID dento de una nodo especificado por su ID


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

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

module.exports = router;