import { Route, Switch, useLocation, useParams, Link, useRouteMatch} from "react-router-dom"
import styled from "styled-components"
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

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

const Title = styled.h1`
    font-size: 48px;
    color : ${(props)=>props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.tapBgColor};
    padding: 15px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
        span:first-child {
            font-size: 13px;
            font-weight: 40;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
`;

const Description = styled.p`
    margin: 20px 0;
`;
const Taps = styled.div`
    display: grid;
    grid-template-columns: repeat(2,auto);
    grid-column-gap: 20px;
`
const Tap = styled.div<{isActive:boolean}>`
    background-color: ${props => props.theme.tapBgColor};
    text-align:center;
    border-radius: 10px;
    margin: 20px 0;
    color : ${ porps => porps.isActive ? props=>props.theme.accentColor : props=>props.theme.textColor};
    a {
        display: block;
        padding: 10px 0px;
    }
`
interface RouteParams {
    coinId : string;
};

interface RouteState {
    name: string
};

interface IInforData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
    logo : string;
    description : string;
    message : string;
    open_source : boolean;
    started_at : string;
    development_status : string;
    hardware_wallet : boolean;
    proof_type : string;
    org_structure : string;
    hash_algorithm : string;
    first_data_at : string;
    last_data_at : string;
};

interface IPriceData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    circulating_supply : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        USD : {
            ath_date : string;
            ath_price : number;
            market_cap : number;
            market_cap_change_24h : number;
            percent_change_1h : number;
            percent_change_1y : number;
            percent_change_6h : number;
            percent_change_7d : number;
            percent_change_12h : number;
            percent_change_15m : number;
            percent_change_24h : number;
            percent_change_30d : number;
            percent_change_30m : number;
            percent_from_price_ath : number;
            price : number;
            volume_24h : number;
            volume_24h_change_24h : number;            
        }
    };
};

interface ICoinProps {
    isDark: boolean;
}

function Coin ({isDark}:ICoinProps) {
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RouteState>();
    const priceMath = useRouteMatch("/:coinId/price"); //해당 url과 일치하면 object 반환, 아니면 null
    const chartMath = useRouteMatch("/:coinId/chart");
    
    const {isLoading:infoLoading, data:infoData} = 
    useQuery<IInforData>(["info",coinId], () => fetchCoinInfo(coinId))
   
    // {
    //     refetchInterval: 5000,  // 5000ms 마다 fetch를 실행한다. -> price값 실시간 업데이트
    // };

    const {isLoading:tickersLoading, data:tickersData} = 
    useQuery<IPriceData>(["tickers",coinId,], () => fetchCoinTickers(coinId));

    const loading = infoLoading || tickersLoading;

    // const [loading, setLoading] = useState(true);
    // const [info, setInfo] = useState<IInforData>();
    // const [priceInfo, setPriceInfo] = useState<IPriceData>();

    // useEffect( () => {
    //     ( async () => {
    //         const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // },[coinId])
    

    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Title>{state?.name ? state.name : loading ? "Loading.." : infoData?.name}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply} </span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Taps>
                        <Tap isActive={ chartMath !== null } >
                           <Link to={`/${coinId}/chart`} > Chart </Link>
                        </Tap>
                        <Tap isActive={ priceMath !== null }>
                            <Link to={`/${coinId}/price`}> Price </Link>
                        </Tap>
                    </Taps>


                    <Switch>
                        <Route path={`/:coinId/chart`}>
                            <Chart coinId={coinId} isDark={isDark} />
                        </Route>
                        <Route path={`/:coinId/price`}>
                            <Price />
                        </Route>
                    </Switch>
                </>
            ) }
        </Container>
    );
}

export default Coin;