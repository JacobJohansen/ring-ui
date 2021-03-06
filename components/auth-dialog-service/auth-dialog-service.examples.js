import React from 'react';

import reactDecorator from '../../.storybook/react-decorator';

import hubConfig from '../../.storybook/hub-config';

import Auth from '@jetbrains/ring-ui/components/auth/auth';
import HTTP from '@jetbrains/ring-ui/components/http/http';
import Button from '@jetbrains/ring-ui/components/button/button';

import showAuthDialog from '@jetbrains/ring-ui/components/auth-dialog-service/auth-dialog-service';

export default {
  title: 'Services/Auth Dialog Service',
  decorators: [reactDecorator()],

  parameters: {
    notes:
      'A wrapper for the AuthDialog component. Allows showing the auth dialog without mounting the AuthDialog component first. Can be used outside React.',
    hermione: {skip: true}
  }
};

export const authDialogService = ({onConfirm, onCancel}) => {
  const auth = new Auth(hubConfig);
  const http = new HTTP(auth, auth.getAPIPath());

  class AuthDialogDemo extends React.Component {
    componentDidMount() {
      auth.init();
      http.get('services/0-0-0-0-0?fields=name,iconUrl').then(serviceDetails => {
        this.setState({serviceDetails});
        this.showAuthDialog();
      });
    }

    componentWillUnmount() {
      if (this.hideAuthDialog) {
        this.hideAuthDialog();
      }
    }

    showAuthDialog = () => {
      const {serviceDetails} = this.state;

      this.hideAuthDialog = showAuthDialog({
        serviceDetails,
        errorMessage: 'Error message',
        onConfirm,
        onCancel
      });
    };

    render() {
      return (
        <div>
          <Button onClick={this.showAuthDialog}>Show auth dialog</Button>
        </div>
      );
    }
  }

  return <AuthDialogDemo/>;
};

authDialogService.argTypes = {onConfirm: {}, onCancel: {}};
