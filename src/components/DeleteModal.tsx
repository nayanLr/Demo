import React, { ReactElement } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONT } from "../constant";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  onDelete,
}: DeleteModalProps): ReactElement => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Managing Agent</Text>
          <Text style={styles.modalDescription}>
            Are you sure you want to delete managing agent details?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.button, styles.deleteButton]}
              onPress={onDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: wp(5),
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.solidBlack,
    fontFamily: FONT.quickSandBold,
  },
  modalDescription: {
    fontSize: wp(4.5),
    marginBottom: 20,
    color: COLORS.solidBlack,
    fontFamily: FONT.quickSandMedium,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontFamily: FONT.quickSandMedium,
  },
});

export default DeleteModal;
