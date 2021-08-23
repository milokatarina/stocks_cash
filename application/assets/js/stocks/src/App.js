import React, {useState} from 'react';
import DSurvey from "./containers/DSurvey";
import * as api from './api';
import RSSurvey from "./containers/RSSurvey";
import Game from "./containers/Game";
import TrialGame from "./containers/TrialGame";
import RSSurvey2 from "./containers/RSSurvey2";
import {EndGame} from "./containers/EndGame";
import RegretSurvey from "./containers/RegretSurvey";
import FinanceSurvey from "./containers/FinanceSurvey";

export const App = ({yearsRevenue}) => {
    const [screenNumber, setScreenNumber] = useState(1);
    const [playId, setPlayId] = useState(null);
    const [userId, setUserId] = useState(null);

    const onNextRSSurvey = ({rs1, rs2, rs3, rs4, rs5, rs6, rs7}) => {
        api.sendRSAnswers({
            userId, rs1, rs2, rs3, rs4, rs5, rs6, rs7
        }).then((response) => {
            setScreenNumber(screenNumber + 1);
        })
    }

    const onNextRegretSurvey = ({ks1, ks2, ks3, ks4, ks5, ks6, ks7}) => {
        api.sendKSAnswers({
            userId, ks1, ks2, ks3, ks4, ks5, ks6, ks7
        }).then((response) => {
            setScreenNumber(screenNumber + 1);
        })
    }

    const onNextFinanceSurvey = ({fs1, fs2, fs3, fs4, fs5, fs6, fs7, fs8, fs9, fs10, fs11, fs12}) => {
        api.sendFSAnswers({
            userId, fs1, fs2, fs3, fs4, fs5, fs6, fs7, fs8, fs9, fs10, fs11, fs12
        }).then((response) => {
            setScreenNumber(screenNumber + 1);
        })
    }

    const onNextRSSurvey2 = ({rs8, rs9, rs10, rs11, rs12, rs13, rs14}) => {
        api.sendRSAnswers2({
            userId, rs8, rs9, rs10, rs11, rs12, rs13, rs14
        }).then((response) => {
            setScreenNumber(screenNumber + 1);
        })
    }
    const onScreenChange = () => {
        setScreenNumber(screenNumber + 1);
    }
    switch (screenNumber) {
        case 1:
            return <DSurvey onNextChange={({ds1, ds2, ds3, ds4, ds5, ds6, ds7, ds8, ds9, ds10}) => {
                pre: typeof ds1 === 'boolean';
                api.initGame({
                    ds1, ds2, ds3, ds4, ds5, ds6, ds7, ds8, ds9, ds10
                }).then((response) => {
                    setScreenNumber(screenNumber + 1);
                    setPlayId(response.data.data.playId);
                    setUserId(response.data.data.userId);
                })
            }}/>
        case 2:
            return <RSSurvey
                onNextChange={onNextRSSurvey}
            />
        case 3:
            return <TrialGame
                yearsRevenue={yearsRevenue}
                userId={userId}
                playId={playId}
                onScreenChange={onScreenChange}
            />
        case 4: {
            return <Game
                yearsRevenue={yearsRevenue}
                userId={userId}
                playId={playId}
                onScreenChange={onScreenChange}
            />
        }
        case 5: {
            return <RSSurvey2
                onNextChange={onNextRSSurvey2}
            />
        }
        case 6: {
            return <RegretSurvey
                onNextChange={onNextRegretSurvey}
            />
        }
        case 7: {
            return <FinanceSurvey
                onNextChange={onNextFinanceSurvey}
            />
        }
        default: {
            return <EndGame title="Kraj igre. Hvala Vam na izdvojenom vremenu. :)" onNextClick={() => {
            }} hasNextButton={false}/>
        }
    }
}
