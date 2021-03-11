import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import DescriptionIcon from "@material-ui/icons/Description";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Card} from "reactstrap";
import {BASEURL} from "../../../shared/BaseURL";
import CardActionArea from "@material-ui/core/CardActionArea";

export default function ListUnit(props) {
    const {classes,unit,index,handleModalDesc,countLove,setCountLove,handleModalTrx}=props
    return(
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    color="primary"
                    height="200"
                    src={`${BASEURL}/unit/photo/${unit.id}`}
                    onClick={() => handleModalDesc(unit)}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {unit.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton aria-label="add to favorites" key={index} onClick={()=>setCountLove(countLove+1)}>
                    <FavoriteIcon/> <Typography>{countLove}</Typography>
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <DescriptionIcon color="primary"
                                     className="mr-1"
                                     onClick={() => handleModalDesc(unit)}/>
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <ShoppingCartIcon color="primary"
                                      className="mr-1"
                                      onClick={() => handleModalTrx(unit)}/>
                </IconButton>
                <Chip label={`${unit.price}`} variant="outlined" color="primary"
                      avatar={<Avatar>Rp</Avatar>}/>
            </CardActions>
        </Card>
    )
}
