// import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { handleDelete } from '../../../CrudRedux';
// const CardStore = ( { item  } ) => {
//     const res = item._document.data.value.mapValue.fields;

//     return (
//         <Card>
//           <CardMedia
//             component="img"
//             height="140"
//             image={res.image.stringValue}
//             alt="green iguana"/>
//             <CardContent>
//             <Typography variant="h4"  sx={{ pt: 1, pb: 1 }}>
//               {res.brand.stringValue}
//             </Typography>
//             <Typography variant="a" sx={{ pt: 1, pb: 1 }}>
//               {res.price.stringValue}
//             </Typography>
//             <Typography variant="h5"  sx={{ pt: 1, pb: 1 }}>
//               {res.rating.stringValue}
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{ pt: 1, pb: 1 }}>
//               {res.description.stringValue}
//             </Typography>
//            </CardContent>
//           <CardActions> 
  
//               <Button
//                     onClick={() =>  handleDelete(item.id).toString()}
//                     className="btn-danger">
//                      Delete
//              </Button>
//              <Link to={`edit/${item.id}`} >
//              <Button >
//                  Edit
//              </Button>
//              </Link>

//           </CardActions>
//         </Card>
//       );
// };

// export default CardStore;