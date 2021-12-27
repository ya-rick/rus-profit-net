import { SecondaryButton } from '../../common/components/Buttons';


export default function HeaderButton({ icon, text, isCropped, children, ...rest }) {
    return <SecondaryButton {...rest}>
        {icon}
        {!isCropped && (children ?? text) }
    </SecondaryButton>
}
