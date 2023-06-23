import { BaseToast, ErrorToast } from "react-native-toast-message";
import CustomToast from "./CustomToast";

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props : any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),

    presstoClose: (props: any) => (
        // <ErrorToast
        //   {...props}
        //   style={{ borderLeftWidth: 0, height:30, borderRadius:20, width:200 }}
        //   contentContainerStyle={{  }}
        //   text1Style={{
        //     fontSize: 13,
        //     textAlign: "center"
        //   }}
        //   text2Style={{
        //     fontSize: 15
        //   }}
        // />
        <CustomToast {...props}/>
      ),
  


}