import { Language } from '../config/content';

// Temporary wrapper to add language prop to components that haven't been migrated yet
// This allows the app to work while components are being updated

export function withLanguageSupport<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P & { language?: Language }> {
  return (props: P & { language?: Language }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { language, ...rest } = props;
    return <Component {...(rest as P)} />;
  };
}
