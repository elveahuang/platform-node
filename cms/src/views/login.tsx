import React, { FC } from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMount } from 'ahooks';
//
import { useRootDispatch } from '@/store';
import { loginAsync } from '@/store/actions';
import { Credentials } from '@/types';
import { credentials, log } from '@/utils';

const Login: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useRootDispatch();
    const onFinish = async (values: any) => {
        dispatch(
            await loginAsync({
                identifier: values.username,
                password: values.password,
            }),
        ).then(async () => {
            navigate('/', { replace: true });
        });
    };
    const onFinishFailed = (e: any) => {
        console.log(e);
    };
    useMount(async () => {
        log('Page <<Login>> mounted.');
    });
    return (
        <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
            <Col xs={{ span: 20 }} sm={{ span: 16 }} md={{ span: 12 }} lg={{ span: 10 }} xl={{ span: 8 }}>
                <Card className={'login-card'} title={t('common:user_page_login_title')}>
                    <Form<Credentials> className={'login-form'} initialValues={credentials} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                            <Input prefix={<UserOutlined />} type="text" size="large" placeholder={t('common:user_page_login_title')} />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input.Password size="large" prefix={<UserOutlined />} placeholder={t('common:user_page_login_title')} />
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Row justify={'center'} align={'middle'}>
                                <Col span={12} className={'text-left'}>
                                    <Link to="/register">
                                        <Button type="link" htmlType="button">
                                            Register
                                        </Button>
                                    </Link>
                                </Col>
                                <Col span={12} className={'text-right'}>
                                    <Link to="/register">
                                        <Button type="link" className={'right-pull'} htmlType="button">
                                            Forgot Password
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;
