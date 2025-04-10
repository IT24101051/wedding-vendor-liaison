
package com.weddingvendor.backend;

import java.io.Serializable;

/**
 * Node class for the Vendor LinkedList implementation
 */
public class VendorNode implements Serializable {
    private static final long serialVersionUID = 1L;
    private Vendor data;
    private VendorNode next;
    
    public VendorNode(Vendor data) {
        this.data = data;
        this.next = null;
    }
    
    public Vendor getData() {
        return data;
    }
    
    public void setData(Vendor data) {
        this.data = data;
    }
    
    public VendorNode getNext() {
        return next;
    }
    
    public void setNext(VendorNode next) {
        this.next = next;
    }
    
    /**
     * Helper method to traverse to the end of the list
     * @return the last node in the list
     */
    public VendorNode getLastNode() {
        VendorNode current = this;
        while (current.next != null) {
            current = current.next;
        }
        return current;
    }
    
    /**
     * Check if this node matches the given vendor ID
     * @param id the vendor ID to match
     * @return true if this node's vendor ID matches the given ID
     */
    public boolean hasId(String id) {
        if (data == null || id == null) {
            return false;
        }
        
        String vendorId = data.getId();
        if (vendorId == null) {
            return false;
        }
        
        return vendorId.equals(id);
    }
    
    /**
     * Check if the node has valid data
     * @return true if the node has valid vendor data
     */
    public boolean hasValidData() {
        return data != null && data.getId() != null && !data.getId().isEmpty();
    }
    
    @Override
    public String toString() {
        if (data == null) {
            return "Node[null]";
        }
        return "Node[" + data.getId() + ": " + data.getName() + "]";
    }
}
