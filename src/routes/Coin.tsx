import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components"

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
`

const Overview = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.5);
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

interface RouteParams {
    coinId : string;
}

interface RouteState {
    name: string
}


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
}



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
}

function Coin () {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RouteState>();
    const [info, setInfo] = useState<IInforData>();
    const [priceInfo, setPriceInfo] = useState<IPriceData>();
    
    useEffect( () => {
        ( async () => {
            const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    },[coinId])

    return (
        <Container>
            <Header>
                <Title>{state?.name ? state.name : loading ? "Loading.." : info?.name}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{info?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${info?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Open Source:</span>
                            <span>{info?.open_source ? "Yes" : "No"}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{info?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{priceInfo?.total_supply} </span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceInfo?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                </>




            ) }
        </Container>
    );
}

export default Coin;