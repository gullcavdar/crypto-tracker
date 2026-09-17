import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0A0F1D' 
  },
  scrollContent: { 
    paddingHorizontal: 16, 
    paddingTop: 10, 
    paddingBottom: 30 
  },
  sectionTitle: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 12 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    backgroundColor: '#1B2A4A', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    padding: 24, 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(255, 255, 255, 0.1)' 
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  modalTitle: { 
    color: '#FFFFFF', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  modalSubtitle: { 
    color: '#8E8E93', 
    fontSize: 14, 
    marginBottom: 20 
  },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#0A0F1D', 
    borderRadius: 14, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.08)', 
    paddingHorizontal: 16, 
    height: 54, 
    marginBottom: 24 
  },
  currencySymbol: { 
    color: '#34C759', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginRight: 8 
  },
  modalInput: { 
    flex: 1, 
    color: '#FFFFFF', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  actionButton: { 
    backgroundColor: '#34C759', 
    height: 50, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  actionButtonText: { 
    color: '#0A0F1D', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});