import styled from "styled-components"
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import Helmet from "react-helmet";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height : 15vh;
    display : flex;
    align-items: center;
    justify-content: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color : white;
    color : ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid rgba(0,0,0,0.5);
    a{  
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color .2s ease-in;
    }
    &:hover {
        a{
            color: ${props => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color : ${(props)=>props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`
const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

interface ICoinsProps {
    toggleDark : () => void;
}
function Coins({toggleDark}:ICoinsProps) {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins",fetchCoins)
   /*  const [coins,setCoins] = useState<CoinInterface[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        (async()=> {
            const response =  await fetch("https://api.coinpaprika.com/v1/coins")
            const json = await response.json();
            setCoins(json.slice(0,100));
            setLoading(false);
        })();
    }, []); */
    return(
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                <button onClick={toggleDark}> darkMode </button>
            </Header>
            {isLoading ? <Loader>Loading...</Loader> 
            : <CoinsList>
                {data?.slice(0,100).map(coin => <Coin key={coin.id}>
                    <Link to={{
                        pathname : `/${coin.id}`,
                        state : { name:coin.name }
                        }}> 
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                    {coin.name} &rarr; </Link>
                </Coin>)}
            </CoinsList>}
        </Container>
    );
}

export default Coins;