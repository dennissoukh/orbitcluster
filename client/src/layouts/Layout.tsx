const Layout: React.FC<{ layout: any }> = ({ layout: Layout, children }) => {
    return (
        <Layout>{children}</Layout>
    );
}

export default Layout;

