import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import { CardActionArea, TextField } from "@mui/material";
import NumberSelector from "./NumberSelector";
// import { useTheme } from "@mui/material/styles";

const Dish = ({ dish, cart, setCart }) => {
  // const theme = useTheme();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const [dishNum, setDishNum] = React.useState(0);
  const onClick_open = () => setModalOpen(true);
  const onClick_close = () => setModalOpen(false);

  const onClick_addToCart_withNotes = () => {
    let idx = cart.map((e, index) => {
      if (e.id === dish.id && e.customization.localeCompare(notes) === 0)
        return index;
    });
    if (idx.some((e) => e)) {
      idx.map((e) => {
        if (e) {
          let items = [...cart];
          items[e].dishesNum += 1;
          setCart(items);
        }
        return null;
      });
    } else {
      setCart([
        ...cart,
        {
          name: dish.name,
          id: dish.id,
          img: dish.img,
          customization: notes,
          dishesNum: dishNum,
          price: dish.price,
        },
      ]);
    }
    setDishNum(0);
    setModalOpen(false);
  };

  const onChange_notes = (e) => {
    setNotes(e.target.value);
  };

  const modalStyle = {
    position: "absolute",
    top: "5%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    width: "80%",
    maxWidth: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    overflowY: "scroll",
  };

  return (
    <>
      <Card sx={{ width: "100%", height: 100, marginTop: 2, display: "flex" }}>
        <CardActionArea
          sx={{ display: "flex" }}
          component={Button}
          onClick={onClick_open}
        >
          <CardMedia
            sx={{ position: "relative", width: "40%" }}
            component="img"
            alt="圖片尚未準備"
            image={dish.img}
          />
          <CardContent
            sx={{ position: "relative", flex: "1 0 auto", width: "60%" }}
          >
            <Typography color="text.secondary">{dish.name}</Typography>
            <Typography color="text.secondary">$ {dish.price}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={onClick_close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
        sx={{ overflow: "scroll" }}
        style={{ overflow: "scroll" }}
      >
        <Fade in={modalOpen}>
          <Box sx={modalStyle}>
            <img
              src={dish.img}
              className={"pb-4 w-full max-w-md h-44 sm:h-52"}
            />
            <Typography id="transition-modal-title" variant="h5" component="h2">
              {dish.name}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 0.5 }}>
              {dish.description}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 0.5 }}>
              $ {dish.price} / 份
            </Typography>
            <Divider className="pt-1" />
            <NumberSelector dishNum={dishNum} setDishNum={setDishNum} />
            <div className="pt-5 pb-5">
              <TextField
                id="outlined-textarea"
                label="備註欄"
                placeholder="若您有特殊需求，像是火鍋不要芋頭或是香菜加倍，可於此備註"
                multiline
                className="text-xs"
                size="small"
                color="secondary"
                sx={{ fontSize: 1 }}
                rows={3}
                onChange={onChange_notes}
              />
            </div>
            <Button
              variant="contained"
              size="small"
              onClick={onClick_addToCart_withNotes}
              disabled={dishNum > 0 ? false : true}
            >
              加到購物車
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Dish;
