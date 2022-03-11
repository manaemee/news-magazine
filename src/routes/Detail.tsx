import { Link, useParams } from "react-router-dom";
import { fetchNews } from "../api";
import styled from "styled-components";
import { useQuery } from "react-query";

const Container = styled.div`
`;

const Header = styled.header`
position: fixed;
top: 0;
width:100% ;
padding:5vh 10vh;
text-transform:uppercase ;
`;
const Main = styled.div`
background-color: ${props=>props.theme.boxColor};
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 0 20px;
`;
const Title = styled.h3`
margin-bottom: 10vh;
font-family: "Montserrat";
  font-weight: 500;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;
const Content = styled.div`
text-align:center ;
min-width: 35%;
margin: 0 auto ;
background-color:${props=>props.theme.boxColor} ;
border: 2px solid ${props=>props.theme.bgandtextColor};
border-radius:5px ;
font-size:22px ;
padding: 10px;
line-height: 150%;
font-family: 'Roboto Mono', monospace;
`;
const Micro = styled.div`
margin-top: 10vh;
display: flex;
flex-direction:column ;
text-align:center ;
font-family: "Montserrat";
font-weight: 500;
font-size: 20px;
text-transform: uppercase;
letter-spacing: 2px;
  a{
background-color:${props=>props.theme.boxColor} ;
border: 2px solid ${props=>props.theme.bgandtextColor};
padding:10px ;
  }
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

function Detail(){
    const {category, index} = useParams();
    const {isLoading, data:news} = useQuery<INews>(String(category), ()=>fetchNews(category));
    const array = news?.data.slice(0,10)[Number(index)];
    return(
        <>
        <Container>
            <Header><Link to="/all">Home</Link></Header>
            <Main>
                <Title>{array?.title}</Title>
                {isLoading ? <Content>"Plase Wait a minute"</Content> : <Content>{array?.content}</Content>}       
                <Micro>
                    <span>{array?.author}</span>
                    <span>{array?.date}</span>
                   {array?.readMoreUrl ? <a href={array?.readMoreUrl} rel="noreferrer" target="_blank">Read More</a> : undefined}
                </Micro>
            </Main>
        </Container>
        </>
    );
}

export default Detail;