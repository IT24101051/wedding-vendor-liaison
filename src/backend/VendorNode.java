
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
        return data != null && data.getId() != null && data.getId().equals(id);
    }
}
