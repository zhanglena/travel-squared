export default function ErrorNotification(props) {
    if (!props.error) {
        return null;
    }

    return (
        <div className="alert alert-danger" role="alert">
            {props.error}
        </div>
    );
}
