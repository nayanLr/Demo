import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { COLORS, FONT, images } from "../constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SubmitButton from "../components/SubmitButton";
import RBSheet from "react-native-raw-bottom-sheet";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { object, string } from "yup";
import InputText from "../components/InputText";
import { useDispatch, useSelector } from "react-redux";
import { Agent } from "../store";
import DeleteModal from "../components/DeleteModal";

interface FormValues {
  companyName: string;
  name: string;
  mobileNo: string;
  landlineNo: string;
  licenceNo: string;
  emailAddress: string;
  secendryEmailAddress: string;
}

const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let formValidation = object({
  companyName: string().required("Company name is required!"),
  name: string().required("Person name is required!"),
  mobileNo: string()
    .matches(phoneRegExp, "Mobile number is not valid!")
    .required("Mobile number is required!"),
  landlineNo: string()
    .matches(phoneRegExp, "Mobile number is not valid!")
    .required("Mobile number is required!"),
  licenceNo: string().required("Licence number is required!"),
  emailAddress: string()
    .matches(emailRegExp, "Email address is not valid!")
    .required("Email address is required!"),
  secendryEmailAddress: string()
    .matches(emailRegExp, "Secendry email address is required!")
    .required("Secendry email address is required!"),
});

const Home = () => {
  const dispatch = useDispatch();
  const agentList = useSelector<any, Agent[]>(
    (state) => state?.agentRecord?.agents
  );
  const companyRef = useRef<any>();
  const nameRef = useRef<any>();
  const mobileRef = useRef<any>();
  const landlineRef = useRef<any>();
  const licenceRef = useRef<any>();
  const emailRef = useRef<any>();
  const secendaryEmailRef = useRef<any>();
  const refRBSheet = useRef<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any>();

  const editRecord = () => {
    setIsEdit(true);
    refRBSheet.current.open();
  };

  const submitForm = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    if (isEdit) {
      dispatch.agentRecord.updateAgent(values);
      setIsEdit(false);
    } else {
      dispatch.agentRecord.addAgent(values);
    }
    resetForm();
    refRBSheet.current.close();
  };

  const renderAgent = ({ item }: { item: Agent }) => {
    return (
      <View style={styles.cardContainer}>
        {/* User Card Content */}
        <View style={styles.innerTopContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.freepik.com/256/1077/1077114.png",
              }}
              style={styles.imageStyles}
            />
          </View>
          <View style={styles.address}>
            <Text style={styles.addressTitle}>{item?.companyName}</Text>
          </View>
          <View style={styles.editButtonContainer}>
            <TouchableOpacity onPress={() => editRecord(item)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.secendContainer}>
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={styles.name}>{item?.mobileNo}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Delete Agent */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.delete}
          onPress={() => {
            setIsDelete(true);
            setDeleteData(item);
          }}
        >
          <Text style={styles.deleteText}>Delete Agent</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Formik
      initialValues={{
        companyName: "",
        name: "",
        mobileNo: "",
        landlineNo: "",
        licenceNo: "",
        emailAddress: "",
        secendryEmailAddress: "",
      }}
      validateOnMount={true}
      validationSchema={formValidation}
      onSubmit={submitForm}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        touched,
        errors,
        resetForm,
      }: FormikValues<FormValues>) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <DeleteModal
              visible={isDelete}
              onClose={() => setIsDelete(false)}
              onDelete={() => {
                dispatch.agentRecord.removeAgentByMobile(deleteData?.mobileNo);
                setIsDelete(false);
              }}
            />
            <Text style={styles.headingText}>Managed by Agent</Text>
            {agentList.length > 0 ? (
              <>
                <FlatList
                  data={agentList}
                  keyExtractor={(item: any) => item?.id}
                  renderItem={renderAgent}
                />
                <SubmitButton
                  title={"Add Managing Agent"}
                  onPress={() => refRBSheet.current.open()}
                />
              </>
            ) : (
              <View style={styles.emptyScreenContainer}>
                <Image
                  source={images.empty}
                  style={styles.emptyImages}
                  resizeMode="contain"
                />
                <SubmitButton
                  title={"Add Managing Agent"}
                  onPress={() => refRBSheet.current.open()}
                />
              </View>
            )}

            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              animationType="slide"
              keyboardAvoidingViewEnabled={true}
              customStyles={{
                container: {
                  height: "90%",
                  backgroundColor: COLORS.lightWhite,
                },
              }}
              closeOnPressBack={true}
            >
              <View style={{ flex: 1 }}>
                <ScrollView>
                  {[
                    {
                      ref: companyRef,
                      placeholder: "Name of the company",
                      key: "companyName",
                    },
                    {
                      ref: nameRef,
                      placeholder: "Name of contact person",
                      key: "name",
                    },
                    {
                      ref: mobileRef,
                      placeholder: "Mobile Number",
                      key: "mobileNo",
                    },
                    {
                      ref: landlineRef,
                      placeholder: "Landline number",
                      key: "landlineNo",
                    },
                    {
                      ref: licenceRef,
                      placeholder: "Liecence number",
                      key: "licenceNo",
                    },
                    {
                      ref: emailRef,
                      placeholder: "Primary email adress",
                      key: "emailAddress",
                    },
                    {
                      ref: secendaryEmailRef,
                      placeholder: "Secondary Email Address",
                      key: "secendryEmailAddress",
                    },
                  ].map(({ ref, placeholder, key }) => (
                    <React.Fragment key={key}>
                      <InputText
                        refs={ref}
                        placeHolderText={placeholder}
                        isNextFocus={
                          key === "secendryEmailAddress" ? null : ref[key + 1]
                        }
                        onBlurInput={handleBlur(key)}
                        onChange={handleChange(key)}
                        maxLength={
                          key == "mobileNo" || key == "landlineNo" ? 10 : null
                        }
                        keyType={
                          key == "mobileNo" || key == "landlineNo"
                            ? "number-pad"
                            : "default"
                        }
                        values={values[key]}
                        isError={touched[key] && errors[key]}
                      />
                      {touched[key] && errors[key] && (
                        <View style={styles.errorContainer}>
                          <Text style={styles.errorText}>{errors[key]}</Text>
                        </View>
                      )}
                    </React.Fragment>
                  ))}
                  <View style={{ marginBottom: wp(30) }} />
                </ScrollView>
                <SubmitButton
                  title={"Submit"}
                  isDisable={!isValid}
                  onPress={handleSubmit}
                />
              </View>
            </RBSheet>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  headingText: {
    fontFamily: FONT.quickSandMedium,
    fontSize: wp(8),
    color: COLORS.solidBlack,
    padding: wp(6),
  },
  cardContainer: {
    marginHorizontal: wp(4),
    borderRadius: wp(2),
    backgroundColor: COLORS.white,
    marginBottom: wp(4),
    padding: wp(3),
  },
  innerTopContainer: {
    flexDirection: "row",
  },
  iconContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    flex: 5,
    paddingStart: wp(2),
  },
  editButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    fontFamily: FONT.quickSandBold,
    fontSize: wp(4.5),
    color: COLORS.blue,
    textDecorationLine: "underline",
    borderColor: COLORS.lightDark,
  },
  addressTitle: {
    color: COLORS.solidBlack,
    fontSize: wp(5),
    fontFamily: FONT.quickSandBold,
  },
  imageStyles: {
    height: wp(5),
    width: wp(5),
    tintColor: COLORS.blue,
  },
  secendContainer: {
    marginHorizontal: wp(8.5),
  },
  name: {
    lineHeight: wp(6),
    fontFamily: FONT.quickSandMedium,
    color: COLORS.textColor,
  },
  divider: {
    borderBottomWidth: 1,
    marginTop: wp(5),
    marginHorizontal: hp(1),
    borderColor: COLORS.gray,
  },
  delete: {
    marginTop: wp(2),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  deleteText: {
    color: COLORS.danger,
    textDecorationLine: "underline",
    fontFamily: FONT.quickSandBold,
    fontSize: wp(4.5),
  },
  emptyScreenContainer: {
    flex: 1,
    justifyContent: "center",
  },
  emptyImages: {
    height: hp(34),
    width: "100%",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  errorImage: {
    marginTop: 2,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.primary,
    alignItems: "center",
    marginStart: wp(6),
    fontFamily: FONT.quickSandMedium,
  },
});

export default Home;
