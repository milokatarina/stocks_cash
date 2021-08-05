import React, {useState} from 'react';
import DSurvey from "./containers/DSurvey";
import * as api from './api';
import RSSurvey from "./containers/RSSurvey";
import Game from "./containers/Game";
import TrialGame from "./containers/TrialGame";

export const App = ({yearsRevenue}) => {
    const [screenNumber, setScreenNumber] = useState(1);
    const [playId, setPlayId] = useState(null);
    const [userId, setUserId] = useState(null);

    const onNextRSSurvey = ({rs11, rs12, rs13}) => {
        console.log(rs11, rs12, rs13);
        api.sendRSAnswers({
            userId, rs11, rs12, rs13
        }).then((response) => {
            setScreenNumber(screenNumber + 1);
        })
    }
    const onScreenChange = () => {
        setScreenNumber(screenNumber + 1);
    }
    switch (screenNumber) {
        case 1:
            return <DSurvey onNextChange={(gender, age, studies) => {
                api.initGame({
                    studies, gender, age
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
        default: {
            return <Game
                yearsRevenue={yearsRevenue}
                userId={userId}
                playId={playId}
                onScreenChange={onScreenChange}
            />
        }
    }
}
