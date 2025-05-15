import React, { Component, createContext, ReactNode } from "react";
import { ConfirmModal, Loading } from "./components";
import { ToastContainer, toast } from "react-toastify";

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
  isShowConfirmModal: boolean;
  confirmModalContent: string;
  confirmModalOnConfirm: any;
}
export default class AppProvider extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      isShowConfirmModal: false,
      confirmModalContent: "",
      confirmModalOnConfirm: () => {},
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

  showConfirmModal = ({
    content,
    onClick,
  }: {
    content: string;
    onClick: any;
  }) => {
    this.setState({
      isShowConfirmModal: true,
      confirmModalContent: content,
      confirmModalOnConfirm: onClick,
    });
  };

  hideConfirmModal = () => {
    this.setState({
      isShowConfirmModal: false,
      confirmModalContent: "",
    });
  };

  render() {
    const func = {
      showLoading: this.showLoading,
      hideLoading: this.hideLoading,
      showConfirmModal: this.showConfirmModal,
      hideConfirmModal: this.hideConfirmModal,
    };
    return (
      <MyContext.Provider value={{ ...func }}>
        <ToastContainer />
        {this.state.isShowConfirmModal && (
          <ConfirmModal
            content={this.state.confirmModalContent}
            onConfirm={this.state.confirmModalOnConfirm}
            onClose={() => this.hideConfirmModal()}
          />
        )}
        <div className="flex flex-1">
          {this.props.children}
          {this.state.isLoading && <Loading />}
        </div>
      </MyContext.Provider>
    );
  }
}
