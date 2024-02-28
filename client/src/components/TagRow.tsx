import { TagRowProps } from "../types"

const TagRow: React.FC<TagRowProps> = ({ tag, clickHandle }) => {
    return (
        <div className="s12 center-align middle-align">
            <div className="grid center-align middle-align">
                <div className="s1 left-align middle-align"/>
                <div className="s8 left-align middle-align">
                    <div className="max">{tag[0]}</div>
                </div>
                <div className="s3 right-align middle-align">
                    <a className="chip secondary" onClick={() => clickHandle(tag[0])}>{tag[1]}</a>
                </div>
            </div>
        </div>
    )
}

export default TagRow
