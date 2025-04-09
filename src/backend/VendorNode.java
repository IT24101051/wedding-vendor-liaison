
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
}
