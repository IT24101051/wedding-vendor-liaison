
package com.weddingvendor.backend;

/**
 * Node class for the Vendor LinkedList implementation
 */
public class VendorNode {
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
