export default function SVGMetadata({svg}: {svg: any}) {
    return (
        <div
            dangerouslySetInnerHTML={{__html: svg}}
        />
    )
}