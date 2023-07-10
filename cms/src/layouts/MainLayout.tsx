import React, { FC, Suspense } from 'react';
import { Col, Layout, Menu, Row } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
//
import { Loading } from '@/components';
//
import './MainLayout.scss';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export type MainLayoutProps = React.PropsWithChildren<{}>;

const MainLayout: FC<MainLayoutProps> = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const layoutClassName = classNames('main-layout', location.pathname === '/home' ? 'home-layout' : null);
    const items = [
        { label: 'Home', key: 'home' },
        { label: 'About', key: 'about' },
    ];
    return (
        <Layout className={layoutClassName}>
            <Layout.Header id="header" className="header">
                <Row className="header-row">
                    <Col md={6} sm={24}>
                        <span className="header-logo">
                            <span>Application</span>
                        </span>
                    </Col>
                    <Col md={18} sm={0}>
                        <div className="header-menu">
                            <Menu mode="horizontal" items={items} />
                        </div>
                    </Col>
                </Row>
            </Layout.Header>
            <Layout.Content>
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </Layout.Content>
            <Layout.Footer id="footer">{t('common:copyright')}</Layout.Footer>
        </Layout>
    );
};

export default MainLayout;
