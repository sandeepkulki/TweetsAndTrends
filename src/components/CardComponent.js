import React from 'react';

class CardComponent extends React.Component {
    render() {
        let data = this.props.data;

        return (
            <div>
                <div className="card-panel grey lighten-5 z-depth-3 hoverable thin">
                    <div className="row valign-wrapper">
                        <div className="col col-sm-2">
                            <img src={data.user.profile_image_url} alt={data.user.name} className="circle responsive-img" />
                        </div>
                        <div className="col col-sm-10 left-align">
                            <span className="black-text">{data.text}</span>
                        </div>

                    </div>
                    <div className="valign-wrapper right-align chip hoverable">
                        {new Date(data.created_at).toLocaleTimeString()}
                    </div>
                    <div className="valign-wrapper right-align chip hoverable">
                        <a href={`https://twitter.com/${data.user.screen_name}`} target="_blank">{`@${data.user.screen_name}`}</a>
                    </div>
                </div>

            </div>
        );
    }
}

export default CardComponent;