import React, { Component, createContext, ReactNode } from 'react';
import { Loading } from './components';

interface IContextProps {
  showLoading: () => void;
  hideLoading: () => void;
}

export const MyContext = createContext<IContextProps | undefined>(undefined);
export const AppConsumer = MyContext.Consumer;

interface IProps {
  children?: ReactNode;
}
interface IState {
  isLoading: boolean;
}
export default class AppProvider extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  showLoading = () => {
    this.setState({
      isLoading: true,
    });
  };

  hideLoading = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const func = {
      showLoading: this.showLoading,
      hideLoading: this.hideLoading,
    };
    return (
      <MyContext.Provider value={{ ...func }}>
        <div className='flex flex-1'>
          {this.props.children}
          {this.state.isLoading && <Loading />}
        </div>
      </MyContext.Provider>
    );
  }
}
