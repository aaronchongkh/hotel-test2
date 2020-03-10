import React from 'react';
import Webcam, { WebcamProps } from 'react-webcam';

interface IState {
    startDate: Date;
    endDate: Date;
    roomType: string;
    previewImg?: any;
    success: boolean; 
    url: string;
    photoInput: boolean;
    test: string;
    tries: number;
}

export default class Lmao extends React.Component<{}, IState> {
    private webcamRef: React.RefObject<Webcam> & React.RefObject<HTMLVideoElement>;
    constructor(props: {}) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.webcamRef = React.createRef();
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            roomType: "", 
            success: false, 
            url: "", 
            photoInput: false,
            test: "", 
            previewImg: null,
            tries: 0
        }
    }

    handleClick = () => {
        var lmao = this.webcamRef.current.getScreenshot();
        this.setState({ 
            previewImg: lmao
         });
      }

    public render(): JSX.Element {
        return <div>
            <h1>lkjsfdlkj</h1>
            <Webcam
            height={360}
            width={1280}
            screenshotFormat="image/jpeg"
            audio={false}
            ref={this.webcamRef}
            />
            <button onClick={this.handleClick}>Capture pic</button>
            <div>
            <img src={this.state.previewImg} />
            </div>
        </div>
    }
}