import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import { fetchNews } from "../api";
import styled ,{ keyframes } from "styled-components";
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight , faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Helmet} from "react-helmet";

const loadingSpin = keyframes`
100% { 
  transform: rotate(360deg); 
  }
`;
const Laoding = styled.div`
height:100vh ;
  svg{
    color: ${props=>props.theme.accentColor};
    animation: ${loadingSpin} 1s infinite;
    font-size:50vh ;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1.5fr 1.9fr 1.5fr;
  grid-template-rows: 1fr 5fr 1fr;
  gap: 1px;
  &>*{
    font-size: 22px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props=>props.theme.boxColor};
  }
`;
const Header = styled.div`
`;
const Menu = styled.div`
display: grid;
grid-template-columns: repeat(2,1fr);
grid-template-rows: repeat(4,1fr);
a{
&:hover{
  svg{
  display: inline;
  color: ${props=>props.theme.accentColor};
  }
}
  svg{
    display: none;
  }
}
`;
const Row = styled.div`
    background-color: ${props=>props.theme.bgandtextColor};
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
    height: 100%;
    align-items: stretch; 
  a{
    cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${props=>props.theme.boxColor};
        &:hover {
        background-color: ${props=>props.theme.hoverColor};
        div{
          span:first-child{
            display: none;
          }
          span:last-child::after{
            content:"Click and Read " ;
          }
        }
      }
  }
`;
const News = styled.div`
`;
const CenterImg = styled.div`
    grid-column: 2/-2;
    grid-row: 2/-2;
    background-size: cover;
    background-position: center;
`;
const scrollText = keyframes`
    0% {
    transform: translateX(-135%);
  }
  50% {
    transform: translateX(135%);
  }
  100% {
    transform: translateX(-135%);
  }
`;
const Footer = styled.footer`
span{
    animation: ${scrollText} 25s linear infinite;
}
    grid-column: 1/-1;
    white-space: nowrap;
    overflow: hidden;
`;

interface INews {
    data: [{
        author:string,
        content:string,
        date:string,
        imageUrl: string,
        readMoreUrl: string,
        time: string,
        title: string,
        url: string,
    }]
}

function Category(){
    const {category} = useParams();
    const {isLoading, data:news} = useQuery<INews>(String(category), ()=>fetchNews(category));
    const imageUrl = news?.data.slice(0,10).map(n=>n.imageUrl);
    const [bgImg, setBgImg] = useState("");
    return (
        <>
        {isLoading ? <Laoding><FontAwesomeIcon icon={faSpinner} /></Laoding> :     
         <Container>
           <Helmet><title>magazine</title></Helmet>
            <Link to="/"><Header>today's paper</Header></Link>
            <Header>{category}</Header>
            <Menu>
            <Link to="/all">
              <FontAwesomeIcon icon={faArrowRight} />
              <span>overview</span>
            </Link>
            <Link to="/sports">
              <FontAwesomeIcon icon={faArrowRight} />
              <span>sports</span>
            </Link>
            <Link to="/politics">
              <FontAwesomeIcon icon={faArrowRight} />
              <span>politics</span>
              </Link>
            <Link to="/technology">
                <FontAwesomeIcon icon={faArrowRight} />
                <span>technology</span>
            </Link>
            <Link to="/startup">
                <FontAwesomeIcon icon={faArrowRight} />
                <span>startup</span>
            </Link>
            <Link to="/entertainment">
                <FontAwesomeIcon icon={faArrowRight} />
                <span>entertainment</span>
            </Link>
            <Link to="/science">
                <FontAwesomeIcon icon={faArrowRight} />
                <span>science</span>
            </Link>
            <Link to="/automobile">
                <FontAwesomeIcon icon={faArrowRight} />
                <span>automobile</span> 
            </Link>
            </Menu> 
            <Row>
                <Link to={`/${category}/${imageUrl?.indexOf(imageUrl?.[0])}`} onMouseOver={() => setBgImg(String(imageUrl?.[0]))}><News><span>#10</span><span></span></News></Link>
                <Link to={`/${category}/${imageUrl?.indexOf(imageUrl?.[1])}`} onMouseOver={() => setBgImg(String(imageUrl?.[1]))}><News><span>#9</span><span></span></News></Link>
                <Link to={`/${category}/${imageUrl?.indexOf(imageUrl?.[2])}`}  onMouseOver={() => setBgImg(String(imageUrl?.[2]))}><News><span>#8</span><span></span></News></Link>
                <Link to={`/${category}/${imageUrl?.indexOf(imageUrl?.[3])}`} onMouseOver={() => setBgImg(String(imageUrl?.[3]))}><News ><span>#7</span><span></span></News></Link>
                <Link to={`/${category}/${imageUrl?.indexOf(imageUrl?.[4])}`} onMouseOver={() => setBgImg(String(imageUrl?.[4]))}><News ><span>#6</span><span></span></News></Link>
            </Row>
            <Row>
              <Link to={`/${category}/${imageUrl?.indexOf(imageUrl?.[5])}`} onMouseOver={() => setBgImg(String(imageUrl?.[5]))}><News ><span>#5</span><span></span></News></Link>
              <Link to={`/${category}/${imageUrl?.indexOf(imageUrl?.[6])}`} onMouseOver={() => setBgImg(String(imageUrl?.[6]))}><News ><span>#4</span><span></span></News></Link>
              <Link to={`/${category}/${imageUrl?.indexOf(imageUrl?.[7])}`} onMouseOver={() => setBgImg(String(imageUrl?.[7]))}><News ><span>#3</span><span></span></News></Link>
              <Link to={`/${category}/${imageUrl?.indexOf(imageUrl?.[8])}`} onMouseOver={() => setBgImg(String(imageUrl?.[8]))}><News ><span>#2</span><span></span></News></Link>
              <Link to={`/${category}/${imageUrl?.indexOf(imageUrl?.[9])}`} onMouseOver={() => setBgImg(String(imageUrl?.[9]))}><News ><span>#1</span><span></span></News></Link>
            </Row>
            <CenterImg style={{backgroundImage: "url(" + bgImg + ")"}}></CenterImg>
            <Footer>
                <span>Understand every aspect of the global issue – and know how to make your next move.</span>
            </Footer>
        </Container>
        }
        </>
    );
}

export default Category;